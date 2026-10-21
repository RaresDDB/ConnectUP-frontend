import { ROUTES } from "../../../constants/route-constants";
import { CardsContainer } from "../attendees/styles";
import { EventGalleryProps } from "./types";
import {
    Photo,
    PhotosTitle,
    PhotosContainer
} from "./styles";

function EventGallery(props: EventGalleryProps) {
    const { gallery } = props;

    return (
        <PhotosContainer>
            <PhotosTitle>
                Photos ({gallery.length})
            </PhotosTitle>
            <CardsContainer>
                {gallery.map((photo, index) => (
                    <Photo
                        key={index}
                        src={ROUTES.STATIC_GALLERY.create(photo)}
                    />
                ))}
            </CardsContainer>
        </PhotosContainer>
    );
};

export default EventGallery;