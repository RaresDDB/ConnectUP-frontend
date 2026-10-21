import Review from "./review";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
// import { addComment } from "../../../features/comments/thunks";
import { ReviewsProps } from "./types";
// import { useAddComment } from "../../../features/comments/hooks";
import { createReview } from "../../../features/reviews/thunks";
import { useAppDispatch } from "../../../store";
import { useCreateReview } from "../../../features/reviews/hooks";
import {
    useState,
    FormEvent,
    ChangeEvent,
    SyntheticEvent
} from "react";
import {
    Form,
    AddButton,
    InputField,
    MainContainer,
    ReviewsContainer
} from "./styles";

const defaultData = {
    title: "",
    text: "",
    rating: 0
}

const defaultErrors = {
    title: "",
    text: ""
}

function Reviews(props: ReviewsProps) {
    const { reviews } = props;

    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const { isLoading } = useCreateReview();

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            title: e.target.value
        })

        if (e.target.value === "") {
            setErrors({
                ...errors,
                title: "Title is required"
            })
            return;
        }

        setErrors({
            ...errors,
            title: ""
        })
    }

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            text: e.target.value
        })

        if (e.target.value === "") {
            setErrors({
                ...errors,
                text: "Text is required"
            })
            return;
        }

        setErrors({
            ...errors,
            text: ""
        })
    }

    const handleChangeRating = (_e: SyntheticEvent<Element, Event>, value: number | null) => {
        setData({
            ...data,
            rating: value || 0
        })
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        id && dispatch(
            createReview({
                ...data,
                eventId: id
            })
        );
        setData(defaultData);
    }

    return (
        <MainContainer>
            <Form onSubmit={handleFormSubmit}>
                <InputField
                    size="small"
                    placeholder="Add review title..."
                    onChange={handleChangeTitle}
                    value={data.title}
                    error={errors.title !== ""}
                    helperText={errors.title}
                />
                <InputField
                    size="small"
                    placeholder="Add review text..."
                    multiline
                    rows={4}
                    value={data.text}
                    onChange={handleChangeText}
                    error={errors.text !== ""}
                    helperText={errors.text}
                />
                <Rating
                    size="large"
                    name="rating"
                    value={data.rating}
                    onChange={handleChangeRating}
                />
                <AddButton
                    size="small"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                >
                    Add review
                </AddButton>
            </Form>
            <ReviewsContainer>
                {
                    reviews.length > 0
                        ? (
                            reviews.map((review, index) => (
                                <Review key={index} {...review} />
                            ))
                        )
                        : (
                            <p>There are no reviews posted yet, you can be first!</p>
                        )
                }
            </ReviewsContainer>
        </MainContainer>
    )
}

export default Reviews;