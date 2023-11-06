import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("./canvasRender.jsx"), {
  ssr: false,
});

export default function CanvasRender(props) {
  return <NoSSRComponent props={props} />;
}
