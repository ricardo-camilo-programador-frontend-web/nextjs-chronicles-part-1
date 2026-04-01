import type { FC } from "react";
import { useState, useEffect, useRef } from "react";

interface Props {
  className?: string;
  src: string;
  params?: Record<string, string>;
  title?: string;
  isModalOpen?: boolean;
}

interface VideoOption {
  reg: RegExp;
  url: string;
  params: Record<string, string>;
}

const VideoPlayer: FC<Props> = ({ className, src, params = {}, title, isModalOpen }) => {
  const [valid, setValid] = useState(false);
  const [url, setUrl] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoOptions: VideoOption[] = [
    {
      reg: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/i,
      url: "https://www.youtube.com/embed/$5",
      params: {
        "picture-in-picture": "1",
        accelerometer: "1",
        gyroscope: "1",
      },
    },
    {
      reg: /^.*vimeo.com\/(\d+)($|\/|\b)/i,
      url: "https://player.vimeo.com/video/$1",
      params: {
        title: "0",
        byline: "0",
        portrait: "0",
      },
    },
    {
      reg: /^.*(?:\/video|dai.ly)\/([A-Za-z0-9]+)([^#\&\?]*).*/i,
      url: "https://www.dailymotion.com/embed/video/$1",
      params: {
        autoplay: "0",
      },
    },
    {
      reg: /^.*coub.com\/(?:embed|view)\/([A-Za-z0-9]+)([^#\&\?]*).*/i,
      url: "https://coub.com/embed/$1",
      params: {
        autoplay: "0",
      },
    },
  ];

  useEffect(() => {
    videoLinkIsValid();
  }, [src]);

  useEffect(() => {
    if (!isModalOpen && iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      iframeRef.current.src = currentSrc;
    }
  }, [isModalOpen]);

  const videoLinkIsValid = () => {
    if (src) {
      for (const option of videoOptions) {
        const video = option;
        const userVideoLink = video.reg.exec(src);

        if (userVideoLink) {
          const combinedParams = { ...video.params, ...params };
          const query = Object.keys(combinedParams)
            .map((key) => key + "=" + combinedParams[key])
            .join("&");
          const and = video.url.indexOf("?") >= 0 ? "&" : "?";
          setUrl(src.replace(video.reg, video.url) + and + query);
          setValid(true);

          return;
        }
      }
    }

    setValid(false);
  };

  useEffect(() => {
    videoLinkIsValid();
  }, [videoLinkIsValid]);

  return valid ? (
    <div
      id="video-embed"
      className={`flex h-full my-12 w-full py-0 overflow-hidden ${className}`}
      role="region"
      aria-label={title || "Video player"}
    >
      <iframe
        ref={iframeRef}
        className="h-full border-0 min-h-96 w-full top-0 left-0 aspect-video overflow-hidden"
        loading="lazy"
        sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation allow-popups"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title || "Embedded video content"}
        src={url}
        aria-hidden="false"
      />
    </div>
  ) : (
    <div
      className="flex h-full my-12 w-full py-0 overflow-hidden"
      role="alert"
      aria-live="polite"
    >
      <div
        className="h-full border-0 min-h-96 w-full top-0 left-0 aspect-video overflow-hidden"
        role="presentation"
      >
        <div
          className="flex items-center justify-center h-full text-2xl text-muted"
          aria-label="Error message"
        >
          <span>Invalid video link</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
