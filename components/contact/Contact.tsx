import { useRef } from "react";
import { useInView } from "framer-motion";
import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import MagneticEffect from "../providers/MagneticEffect";
import ContactLink from "./ContactLink";
import ContactTitle from "./ContactTitle";
import ContactForm from "./ContactForm";
import ContactRounded from "./ContactRounded";
import { Canvas, extend } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import Band from "./Band";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("../assets/3d/card1.glb");
useTexture.preload("../assets/images/tag_texture.png");

export default function Contact() {
  const canvasRef = useRef(null);

  // Hook to detect when Canvas is in viewport
  const isInView = useInView(canvasRef, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <section
      id="contact"
      className="contact-section relative z-[0] mt-24 flex min-h-screen w-full flex-col overflow-hidden bg-zinc-800 dark:bg-zinc-100"
    >
      {/* ContactRounded */}
      <div className="relative z-10">
        <ContactRounded />
      </div>

      <div className="flex w-full flex-1">
        {/* Kolom Kiri: Canvas (Hanya di desktop) */}
        <div ref={canvasRef} className="hidden lg:flex flex-1 relative">
          {isInView && ( // Render Canvas hanya jika masuk viewport
            <Canvas
              className="w-full h-full"
              camera={{ position: [0, 0, 13], fov: 25 }}
              style={{ backgroundColor: "transparent" }}
            >
              <ambientLight intensity={Math.PI} />
              <Physics
                debug={false}
                interpolate
                gravity={[0, -40, 0]}
                timeStep={1 / 60}
              >
                <Band />
              </Physics>
              <Environment background={false} blur={0.75}>
                <Lightformer
                  intensity={2}
                  color="white"
                  position={[0, -1, 5]}
                  rotation={[0, 0, Math.PI / 3]}
                  scale={[100, 0.1, 1]}
                />
                <Lightformer
                  intensity={3}
                  color="white"
                  position={[-1, -1, 1]}
                  rotation={[0, 0, Math.PI / 3]}
                  scale={[100, 0.1, 1]}
                />
              </Environment>
            </Canvas>
          )}
        </div>

        {/* Kolom Kanan: Form */}
        <div className="flex flex-1 flex-col items-center justify-center px-8">
          <ContactTitle title="Contact" />
          <ContactForm />
        </div>
      </div>

      {/* Bagian Sosial Media */}
      <div className="flex w-full justify-between py-12 px-8">
        <div>
          <p className="mb-4 text-xl font-semibold text-zinc-200 dark:text-zinc-800">
            Github
          </p>
          <Link
            href="https://github.com/robbynoviantoo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github Link"
          >
            <MagneticEffect>
              <GithubIcon className="h-8 w-8 text-zinc-100 dark:text-zinc-800" />
            </MagneticEffect>
          </Link>
        </div>
        <div className="flex flex-col items-end">
          <p className="mb-4 text-xl font-semibold text-zinc-200 dark:text-zinc-800">
            Links
          </p>
          <div className="flex items-center gap-x-2">
            <ContactLink
              href="https://instagram.com/robbynovianto_"
              label="Instagram"
              icon={
                <InstagramIcon className="text-zinc-200 dark:text-zinc-800" />
              }
            />
            <ContactLink
              href="mailto:heyitsrobby99@gmail.com"
              label="Email"
              icon={
                <MailIcon className="text-zinc-200 dark:text-zinc-800" />
              }
            />
            <ContactLink
              href="https://www.linkedin.com/in/heyitsrobby/"
              label="LinkedIn"
              icon={
                <LinkedinIcon className="text-zinc-200 dark:text-zinc-800" />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
