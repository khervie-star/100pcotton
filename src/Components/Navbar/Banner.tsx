import { IoClose } from "react-icons/io5";
import {
  FaDiscord,
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";

export default function Banner() {
  const socials = [
    {
      name: "Discord",
      path: "https://discord.gg/BY5RQyd6Gt",
      icon: FaDiscord,
    },
    {
      name: "Youtube",
      path: "https://www.youtube.com/@100pNFT ",
      icon: FaYoutube,
    },
    {
      name: "Tiktok",
      path: "https://www.tiktok.com/@100pnft ",
      icon: FaTiktok,
    },
    {
      name: "Twitter",
      path: "https://twitter.com/100pNFT ",
      icon: FaTwitter,
    },
    {
      name: "Facebook",
      path: "https://www.facebook.com/profile.php?id=100087585485407 ",
      icon: FaFacebookF,
    },
    {
      name: "Instagram",
      path: "https://www.instagram.com/100pnft/ ",
      icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/company/100pnft",
      icon: FaLinkedinIn,
    },
  ];
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true">
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true">
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* <p className="text-sm leading-6 text-gray-900">
          <strong className="font-semibold">GeneriCon 2023</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Join us in Denver from June 7 – 9 to see what’s coming next.
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
          Register now <span aria-hidden="true">&rarr;</span>
        </a> */}
        <div className="text-[16px] flex flex-row gap-5 items-center">
          {socials.map((social, i) => (
            <Link
              key={social.name}
              href={social.path}
              target="_blank"
              className="button w-8 h-8 flex justify-center items-center bg-gradient-to-bl from-primary1 to-primary2 shadow-[-4px_-4px_4px_0px_#0000001A_inset] rounded-full cursor-pointer select-none transition-all duration-150 border-none text-white ">
              <social.icon />
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <IoClose className="h-5 w-5 text-gray-900" aria-hidden="true" />
        </button>
            <Link
                key={social.name}
                href={social.path}
                target="_blank"
                className="button w-10 h-10 flex justify-center items-center bg-gradient-to-tl from-primary2 to-primary1   rounded-full cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#EC4352,0_0px_0_0_#EC4352] active:border-b-[0px] transition-all duration-150 [box-shadow:0_8px_0_0_#EC4352,0_13px_0_0_#EC435241] border-[1px] border-primary1 text-white ">
                <social.icon />
              </Link>
      </div> */}
    </div>
  );
}
