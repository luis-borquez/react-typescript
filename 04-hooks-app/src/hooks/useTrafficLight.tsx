import { useEffect, useState } from "react";

const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
    gray: 'bg-gray-500'
};

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = (initialColor: TrafficLightColor = 'red') => {
    const [light, setLight] = useState<TrafficLightColor>(initialColor);
    const [countdown, setCountdown] = useState(5);

    // Countdown effect
    useEffect(() => {
        if (countdown === 0) return;

        const intervalId = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [countdown]);

    // Traffic light switch effect
    useEffect(() => {
        if (countdown > 0) return;

        setCountdown(5);

        if (light === 'green') {
            setLight('yellow');
            return;
        }
        if (light === 'yellow') {
            setLight('red');
            return;
        }
        if (light === 'red') {
            setLight('green');
            return;
        }
    }, [countdown, light]);

    return {
        // Properties
        colors,
        light,
        countdown,

        // Computed
        percentage: ((countdown/5) * 100),
        greenLight: (light === 'green') ? colors.green : colors.gray,
        yellowLight: (light === 'yellow') ? colors.yellow : colors.gray,
        redLight: (light === 'red') ? colors.red : colors.gray,
    };
}
