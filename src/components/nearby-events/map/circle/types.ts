import { Position } from "../../../../types/position-types";

export interface CircleProps {
    center: Position;
    radius: number;
    setRadius: (radius: number) => void;
    setCenter: (center: Position) => void;
};