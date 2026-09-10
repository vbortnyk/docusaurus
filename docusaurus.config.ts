import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import * as dotenv from "dotenv";

dotenv.config();

const remarkGithubAlerts = require("remark-github-alerts");

const config: Config = {
    title: "Viacheslav Bortnyk | DevSecOps",
    tagline: "DevSecOps · Automation · Infrastructure · Security",
    favicon: "img/logo/vb-logo.png",

    customFields: {
        contactEmail: process.env.CONTACT_EMAIL || "viacheslav.bortnyk@gmail.com",
        linkedinUrl: process.env.LINKEDIN_URL || "https://www.linkedin.com/in/viacheslav-bortnyk/",
    },

    url: process.env.DOCUSAURUS_URL || "https://vbortnyk.github.io",
    baseUrl: process.env.DOCUSAURUS_BASE_URL || "/portfolio/",

    organizationName: "vbortnyk",
    projectName: "docusaurus",

    onBrokenLinks: "throw",

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    breadcrumbs: false,
                    remarkPlugins: [remarkGithubAlerts],
                },

                blog: false,

                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    themeConfig: {
        image: "img/logo/vb-logo.png",

        colorMode: {
            respectPrefersColorScheme: true,
        },

        navbar: {
            logo: {
                alt: "Viacheslav Bortnyk",
                src: "img/logo/vb-logo.png",
                href: "/",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Projects",
                },
                {
                    href:
                        process.env.PROFILE_GITHUB_URL ||
                        "https://github.com/vbortnyk",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },

        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
