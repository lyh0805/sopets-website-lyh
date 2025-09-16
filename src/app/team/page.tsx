import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
}

interface TeamSection {
  title: string;
  members: TeamMember[];
}

const teamData: TeamSection[] = [
  {
    title: "Core Team",
    members: [
      { 
        name: "Yue Hang", 
        role: "Executive Officer", 
        image: "/team/YueHang.png",
        description: "Strangers are just friends waiting to happen."
      },
      { 
        name: "Bryan", 
        role: "Technological Officer", 
        image: "/team/Bryan.png",
        description: "I loved tamagotchis and would love to see digital pets come alive."
      },
      { name: "Janis", role: "Creative Director", image: "/team/Janis.png" }
    ]
  },
  {
    title: "Business Development",
    members: [
      { name: "Aaron", role: "Manager", image: "/team/Aaron.png" },
      { name: "Vivian", role: "Specialist", image: "/team/Vivian.png" },
      { name: "She Jia", role: "Specialist", image: "/team/SheJia.png" },
      { name: "Lek Heng", role: "Specialist", image: "/team/LekHeng.png" }
    ]
  },
  {
    title: "Software",
    members: [
      { name: "Ting Feng", role: "Developer", image: "/team/TingFeng.png" },
      { name: "Kai Seong", role: "Developer", image: "/team/KaiSeong.png" }
    ]
  },
  {
    title: "Art and Animation",
    members: [
      { name: "Sam", role: "Lead Artist", image: "/team/Sam.png" },
      { name: "Videl", role: "Illustrator", image: "/team/Videl.png" },
      { name: "Azra", role: "UI/UX Designer", image: "/team/Azra.png" },
      { name: "Joseph", role: "UI/UX Designer", image: "/team/Joseph.png" },
      { name: "Russel", role: "Merchandise Designer", image: "/team/Russel.png" }
    ]
  }
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-purple-900/20 py-24">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Meet Our Team
          </h1>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-300">
            The passionate individuals behind SoPets, working together to create magical experiences and unforgettable moments.
          </p>
        </div>

        {/* Team Sections */}
        <div className="space-y-24">
          {teamData.map((section) => (
            <div key={section.title} className="relative">
              {/* Section Title */}
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                <div className="mt-2 flex justify-center">
                  <div className="h-1 w-20 rounded bg-purple-500" />
                </div>
              </div>

              {/* Team Grid */}
              <div className="grid auto-rows-fr justify-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(280px,300px))] sm:px-4">
                {section.members.map((member) => (
                  <div
                    key={member.name}
                    className="group relative w-full transform transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Member Card */}
                    <div className="relative overflow-hidden rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 opacity-0 blur transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl" />
                      
                      {/* Image Container */}
                      <div className="relative mb-6 aspect-square overflow-hidden rounded-xl">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                        />
                      </div>

                      {/* Member Info */}
                      <div className="relative z-10 text-center">
                        <h3 className="text-xl font-semibold text-white">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-sm text-purple-300">
                          {member.role}
                        </p>
                        {member.description && (
                          <p className="mt-4 text-sm italic text-gray-400 border-t border-purple-500/20 pt-4">
                            "{member.description}"
                          </p>
                        )}
                      </div>

                      {/* Card Border */}
                      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-purple-500/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 