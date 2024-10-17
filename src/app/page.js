import Image from "next/image";
import Link from 'next/link'

export const metadata = {
  title: "JHUR",
  description: "Jhuril Bandola Developer Profile",
};

export default function Home() {
  return (
    <>
      
      <main className="flex h-auto flex-col items-center justify-between px-7 md:px-24">
        <div className="relative grid place-items-center md:flex md:place-items-center">
          <div className="flex-none">
            <div className="hidden sm:block">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo_transparent.svg"
                alt="Next.js Logo"
                width={600}
                height={600}
                priority
              />
            </div>
            <div className="block sm:hidden">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo_transparent.svg"
                alt="Next.js Logo"
                width={200}
                height={100}
                priority
              />
            </div>
          </div>
          <div className="text-sm md:text-2xl">
            <div className="p-4 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
              <p>
                <span className="font-mono font-bold">
                  Hi, I am a Jhuril Bandola,
                </span>
              </p>
              <p>
                a dedicated and versatile software engineer based in Caraga, Philippines. 
                <br/>
                With a strong background in 
                <br/> 
                <code className="font-mono font-bold">Front End Development / Mobile Development / Web Development</code>, 
                <br/>
                I specialize in creating efficient and innovative solutions using Vue.js, React.js, and Laravel.
              </p>
            </div>
            <div className="my-2 flex items-center justify-start gap-x-6">
              <a
                href="https://www.linkedin.com/in/jhuril-bandola-685712186/"
                target="_blank"
                className={`p-2 rounded-lg bg-gray-900 text-sm text-gray-100 font-bold`}
              >
                <span className="flex items-center justify-end">
                  LinkedIn
                </span>
              </a>
              <a
                href="mailto:jhuril45@gmail.com"
                className={`text-sm text-gray-100 font-bold`}
              >
                <span className="flex items-center justify-end">
                  Email: jhuril45@gmail.com
                </span>
              </a>
            </div>
            <div className="pt-2">
              <a
                href="/projects"
                className="rounded-lg bg-gray-900 p-3 text-white my-4 md:p-4 w-full text-center"
                aria-current="page"
                style={{display: 'block'}}
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </main>
      
    </>
    
  );
}
