import React, { useRef, useState, useEffect } from "react";
import { LottiePlayer } from "lottie-web";

const AboutUs = () => {
  const ref = useRef(null);
  const [lottie, setLottie] = useState(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: "animation.json",
      });

      return () => animation.destroy();
    }
  }, [lottie]);
  return (
    <div className="h-fit mt-16 mx-3">
      <div className="flex flex-col justify-center items-center">
        <div className="w-96 flex flex-col justify-center" ref={ref} />
      </div>
      <div>
        <div class=" font-black">
          <a href="#" class="active">
            Home
          </a>
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
          <a href="#">Link 4</a>
        </div>
        <h2 className="text-4xl font-bold px-4 pb-1  max-w-min">About Us</h2>

        <div className="ml-5 text-sm px-4 box-border border-8 border-opacity-100 border-pink-500">
          <h3 className="font-bold">
            4Hope.in is a single window platform to connect global workforce and
            Human resource department to share and express more open, to create
            economic opportunities. The name &quot;4Hope.in&quot; derived from a
            thought of approaching life in a goal oriented way.
          </h3>
          <br />
          The meaning of &quot;4&quot; represents Stable, Loyal, Trustworthy,
          Practical, Friendly, Strong, Endurance conscientiousness,
          Responsibility, and Stability. Hope is a given name derived from the
          Middle English hope, ultimately from the Old English word
          &quot;hopian&quot; referring to a positive expectation or to the
          theological virtue of hope. It was used as a virtue name by the
          Puritans. &quot;.in&quot; for the representation of India on patriotic
          feeling of love, loyalty, devotion, support and pride directed towards
          own country.
          <br />
          <hr />
          <h3 className="font-bold py-2">Vision, Mission and Values</h3>
          <h3 className="py-2">Vision</h3>
          To be the most trusted and respected single window for global
          workforce
          <br />
          <h3 className="py-2">Mission</h3>
          Mission Create a platform to connect world&apos;s workforce to create
          a win-win situation.
          <h3 className="py-2">Values</h3>Mnemonic &quot;HOPIAN&quot;
          <ul>
            <li>H - Hopeful</li>
            <li>O - Optimistic</li>
            <li>P - Practical</li>
            <li>I - Inspiring</li>
            <li>A - Adaptive</li>
            <li>N - Navigator</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
