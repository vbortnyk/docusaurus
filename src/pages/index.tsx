import type { ReactNode } from "react";
import Head from "@docusaurus/Head";

import Header from "../components/header";
import Hero from "../components/hero";
import Skills from "../components/skills";
import Projects from "../components/projects";
import Contact from "../components/contact";
import Footer from "../components/footer";

export default function Home(): ReactNode {
    return (
        <>
            <Head>
                <title>Portfolio | Viacheslav Bortnyk</title>

                <meta
                    name="description"
                    content="DevSecOps Engineer Portfolio"
                />
            </Head>

            <Header />

            <main>
                <Hero />
                <Skills />
                <Projects />
                <Contact />
            </main>

            <Footer />
        </>
    );
}
