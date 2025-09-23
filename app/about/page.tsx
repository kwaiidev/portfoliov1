export default function About() {
    return (
        <div className="min-h-screen bg-[#1e3b24] flex flex-col items-center justify-start relative">
            <div className="text-center max-w-4xl mt-40">
                <h1 className="text-3xl font-bold text-white mb-4">
                    about me
                </h1>
                    <p className="text-white text-lg">
                        I’m a software engineer specializing in low-level programming and systems development. Currently a third-year Computer Science student at the University of Central Florida, I enjoy exploring innovative ways to optimize software and work with hardware components.
                        In my free time, I enjoy spearfishing, experimenting with random components I find, and playing video games.
                        My technical focus spans systems programming, hardware interfacing, and performance optimization. I’m passionate about building software that combines efficiency with practical problem-solving.
                    </p>
                <h1 className="text-3xl font-bold text-white mb-4 mt-20">skills</h1>
                    <p className="text-white text-lg">
                        languages: c, c++, rust, python, java, javascript, typescript, sql, html/css <br />
                        frameworks/libraries: django, tailwind, mongodb, pandas, numpy, matplotlib <br />
                        developer tools: git, docker, jupyter notebook, vsc, jetbrains, kubernetes, ida pro, eclipse, vercel
                    </p>
            </div>
        </div>
    );
}
