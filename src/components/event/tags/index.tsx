import { EventTagsProps } from "./types";
import {
    TagChip,
    TagsContainer
} from "./styles";

function EventTags(props: EventTagsProps) {
    const { tags } = props;

    return (
        <TagsContainer>
            {tags.length === 0 ? (
                <TagChip label="No tags" />
            ) : (
                tags.map(({ name }, index) => (
                    <TagChip key={index} label={name} />
                ))
            )}
        </TagsContainer>
    )
};

export default EventTags;