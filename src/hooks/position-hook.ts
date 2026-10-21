import { Position } from "../types/position-types";
import { Severity } from "../enums/severity-enums";
import { showToastr } from "../features/toastr/slice";
import { useAppDispatch } from "../store";
import {
  useState,
  useEffect
} from "react";

export const usePosition = () => {
  const dispatch = useAppDispatch();

  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(
        showToastr({
          message: 'Geolocation is not supported by your browser',
          severity: Severity.Error
        })
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        dispatch(
          showToastr({
            message: error.message,
            severity: Severity.Error
          })
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  return { position };
}