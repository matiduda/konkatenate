import { useState } from "react";
import { Flex } from "@radix-ui/themes";

export default function VideoShowcase() {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <Flex width="100%" justify="center" align="center" className="KktColorBkg" style={{
            paddingTop: 15,
            paddingBottom: 15,
        }}>

            <iframe
                width="1280"
                height="720"
                src="https://www.youtube.com/embed/gnfgwkVg7vc?si=FcWYnPRv8aKFit5S&autoplay=1&mute=1&amp;controls=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder="0"
            />
        </Flex>
    )
}