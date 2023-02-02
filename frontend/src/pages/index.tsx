import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const session= useSession()
  console.log(session)
  useEffect(() => {
    const fetchGraph = async () => {
      const response = await fetch("http://127.0.0.1:8000/graph", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const blob = await response.blob();
      var myImage: any = document.querySelector("#graph");
      const objectURL = URL.createObjectURL(blob);
      console.log(objectURL);
      myImage.src = objectURL;
    };
    fetchGraph();
  }, []);

  return (
    <section>
      <p> Hello world </p>
      <img id="graph" src="" alt="graph" />
    </section>
  );
}
