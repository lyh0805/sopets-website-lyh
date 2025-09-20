import { db } from '../../lib/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  try {
    // Check if email already exists
    const emailQuery = query(
      collection(db, 'beta_emails'), 
      where('email', '==', email)
    )
    const querySnapshot = await getDocs(emailQuery)

    if (!querySnapshot.empty) {
      return res.status(200).json({ 
        message: 'Email already registered',
        alreadyExists: true 
      })
    }

    // Add new email to Firestore
    const docRef = await addDoc(collection(db, 'beta_emails'), {
      email: email,
      createdAt: new Date(),
      source: 'website_download'
    })

    console.log('Email added with ID: ', docRef.id)

    // Optional: Send welcome email here (see next steps)

    res.status(200).json({ 
      message: 'Email submitted successfully',
      success: true 
    })
  } catch (error) {
    console.error('Error adding email: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}