import { db } from '../../lib/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

// Retry function for network issues
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error.message)
      if (i === maxRetries - 1) throw error
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  try {
    // Check if email already exists with retry
    const checkEmail = async () => {
      const emailQuery = query(
        collection(db, 'beta_emails'),
        where('email', '==', email)
      )
      return await getDocs(emailQuery)
    }

    const querySnapshot = await retryOperation(checkEmail)
    
    if (!querySnapshot.empty) {
      return res.status(200).json({
        message: 'Welcome back!',
        alreadyExists: true
      })
    }

    // Add new email with retry
    const addEmail = async () => {
      return await addDoc(collection(db, 'beta_emails'), {
        email: email,
        createdAt: new Date(),
        source: 'website_download'
      })
    }

    const docRef = await retryOperation(addEmail)
    console.log('Email added with ID: ', docRef.id)

    res.status(200).json({
      message: 'Email submitted successfully',
      success: true
    })
    
  } catch (error) {
    console.error('Error adding email: ', error)
    
    // Handle specific Firebase errors
    if (error.code === 'permission-denied') {
      return res.status(403).json({
        message: 'Database permission denied. Please check Firestore rules.'
      })
    }
    
    if (error.code === 'unavailable' || error.message.includes('CANCELLED')) {
      return res.status(503).json({
        message: 'Service temporarily unavailable. Please try again.'
      })
    }
    
    res.status(500).json({ message: 'Internal server error' })
  }
}