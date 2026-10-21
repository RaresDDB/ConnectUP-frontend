import CreateEventMap from "../../../components/create-event/map";
import { Data } from "./types";
import { FaTimes } from "react-icons/fa";
import { Severity } from "../../../enums/severity-enums";
import { showToastr } from "../../../features/toastr/slice";
import { createEvent } from "../../../features/events/thunks";
import { useDropzone } from "react-dropzone";
import { useGetAllTags } from "../../../features/tags/hooks";
import { useAppDispatch } from "../../../store";
import { useCreateEvent } from "../../../features/events/hooks";
import { useGetAllMembers } from "../../../features/members/hooks";
import {
    useState,
    FormEvent,
    ChangeEvent,
    Fragment,
    SyntheticEvent
} from "react";
import {
    Select,
    Switch,
    MenuItem,
    Checkbox,
    InputLabel,
    ListItemText,
    OutlinedInput,
    SelectChangeEvent,
} from "@mui/material";
import {
    Form,
    Text,
    Title,
    Input,
    Image,
    MapWrapper,
    InputField,
    FormWrapper,
    InputsGroup,
    TitleWrapper,
    GalleryImage,
    SubmitButton,
    MainContainer,
    InnerContainer,
    ImageContainer,
    DragAndDropZone,
    CancelIconButton,
    InputFormControl,
    GalleryContainer,
    SubmitButtonWrapper,
    GalleryImageContainer,
    IsPaidFormControlLabel
} from "./styles";

const currencies = ['RON', 'USD', 'EUR', 'GBP'];

const defaultData = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    hostId: '',
    tags: [],
    isPaid: false,
    price: 0,
    currency: 'RON',
    maxAttendees: 0
}

const defaultErrors = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    hostId: '',
    tags: ''
}

function CreateEvent() {
    const dispatch = useAppDispatch();

    const { tags } = useGetAllTags();
    const { members } = useGetAllMembers();
    const { isLoading } = useCreateEvent();

    const [image, setImage] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);
    const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
    const [imagePreview, setImagePreview] = useState('');
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const [data, setData] = useState<Data>(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const isDisabled = (
        Object.values(errors).some(error => error !== '')
        || markers.length === 0
        || markers.length > 1
        || data.title === ''
        || data.host === ''
        || data.description === ''
        || data.startDate === ''
        || data.tags.length === 0
        || !image
    );

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, title: e.target.value });

        if (e.target.value === '') {
            setErrors({ ...errors, title: 'Title is required' });
            return;
        }

        setErrors({ ...errors, title: '' });
    }

    const handleChangeHostId = (e: SelectChangeEvent) => {
        setData({ ...data, hostId: e.target.value as string });

        if (e.target.value === '') {
            setErrors({ ...errors, hostId: 'Host is required' });
            return;
        }

        setErrors({ ...errors, hostId: '' });
    };

    const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, description: e.target.value });

        if (e.target.value === '') {
            setErrors({ ...errors, description: 'Description is required' });
            return;
        }

        setErrors({ ...errors, description: '' });
    }

    const handleChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;

        if (newStartDate === '') {
            setErrors({ ...errors, startDate: 'Start date is required' });
            setData({ ...data, startDate: newStartDate });
            return;
        }

        const selectedStartDate = new Date(newStartDate);
        const endDate = data.endDate ? new Date(data.endDate) : null;
        const currentDate = new Date();

        if (selectedStartDate < currentDate) {
            setErrors({ ...errors, startDate: 'Start date cannot be in the past' });
            return;
        }

        if (endDate && selectedStartDate > endDate) {
            setErrors({
                ...errors,
                startDate: 'Start date cannot be after end date',
                endDate: 'End date must be after start date'
            });
            return;
        }

        setData({ ...data, startDate: newStartDate });
        setErrors({ ...errors, startDate: '', endDate: '' });
    };

    const handleChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
        const newEndDate = e.target.value;

        if (newEndDate === '') {
            setErrors({ ...errors, endDate: '' });
            setData({ ...data, endDate: newEndDate });
            return;
        }

        const selectedEndDate = new Date(newEndDate);
        const startDate = data.startDate ? new Date(data.startDate) : null;
        const currentDate = new Date();

        if (selectedEndDate < currentDate) {
            setErrors({ ...errors, endDate: 'End date cannot be in the past' });
            return;
        }

        if (startDate && selectedEndDate < startDate) {
            setErrors({ ...errors, endDate: 'End date must be after start date' });
            return;
        }

        setData({ ...data, endDate: newEndDate });
        setErrors({ ...errors, endDate: '' });
    };

    const handleChangeTags = (e: SelectChangeEvent<typeof data.tags>) => {
        const {
            target: { value },
        } = e;

        setData({
            ...data,
            tags: typeof value === 'string' ? value.split(',') : value
        });
    };

    const handleChangeIsPaid = (_e: SyntheticEvent, checked: boolean) => {
        setData({ ...data, isPaid: checked });
    }

    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const price = parseInt(e.target.value);
        setData({ ...data, price });
    }

    const handleChangeCurrency = (e: SelectChangeEvent) => {
        setData({ ...data, currency: e.target.value as string });
    }

    const handleChangeMaxAttendees = (e: ChangeEvent<HTMLInputElement>) => {
        const maxAttendees = parseInt(e.target.value);
        setData({ ...data, maxAttendees });
    }

    const handleCancelImage = () => {
        setImage(null);
        setImagePreview('');
    }

    const handleRemovePreview = (indexToRemove: number) => {
        const newGalleryPreviews = galleryPreviews.filter((_, index) => index !== indexToRemove);
        URL.revokeObjectURL(galleryPreviews[indexToRemove]);
        setGalleryPreviews(newGalleryPreviews);
        setGallery(gallery.filter((_, index) => index !== indexToRemove));
    };

    const onDropImage = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setImage(file);
        }
    };

    const onDropGallery = (acceptedFiles: File[]) => {
        const previews = acceptedFiles.map(file => URL.createObjectURL(file));
        setGallery(acceptedFiles);
        setGalleryPreviews(previews);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            dispatch(
                showToastr({
                    message: 'Image is required',
                    severity: Severity.Warning
                })
            );
            return;
        }

        if (markers.length === 0) {
            dispatch(
                showToastr({
                    message: 'At least one location is required',
                    severity: Severity.Warning
                })
            );
            return;
        }

        if (markers.length > 1) {
            dispatch(
                showToastr({
                    message: 'Only one location is allowed',
                    severity: Severity.Warning
                })
            );
            return;
        }

        dispatch(
            createEvent({
                ...data,
                image,
                gallery,
                marker: markers[0]
            })
        );

        setData(defaultData);
        setMarkers([]);
        setImage(null);
        setImagePreview('');
        setGallery([]);
        setGalleryPreviews([]);
    }

    const { getRootProps: getRootImageProps, getInputProps: getInputImageProps, isDragActive: isDragImageActive } = useDropzone({ onDrop: onDropImage });
    const { getRootProps: getRootGalleryProps, getInputProps: getInputGalleryProps, isDragActive: isDragGalleryActive } = useDropzone({ onDrop: onDropGallery });

    if (!tags || !members) {
        return null;
    }

    return (
        <MainContainer>
            <InnerContainer>
                <TitleWrapper>
                    <Title>Create event</Title>
                </TitleWrapper>
                <FormWrapper>
                    <Form onSubmit={handleSubmit}>
                        <InputsGroup>
                            <IsPaidFormControlLabel
                                control={<Switch />}
                                label="It is paid?"
                                onChange={handleChangeIsPaid}
                            />
                            {data.isPaid && (
                                <Fragment>
                                    <InputField
                                        required
                                        size="small"
                                        name='price'
                                        label='Price'
                                        type='number'
                                        value={data.price}
                                        onChange={handleChangePrice}
                                    />
                                    <InputFormControl size="small" required>
                                        <InputLabel id="currency-select-label">Currency</InputLabel>
                                        <Select
                                            labelId="currency-select-label"
                                            id="currency-select"
                                            value={data.currency}
                                            label="Currency"
                                            onChange={handleChangeCurrency}
                                        >
                                            {currencies.map((currency, index) => (
                                                <MenuItem key={index} value={currency}>{currency}</MenuItem>
                                            ))}
                                        </Select>
                                    </InputFormControl>
                                    <InputField
                                        size="small"
                                        name='maxAttendees'
                                        label='Max participants'
                                        type='number'
                                        value={data.maxAttendees}
                                        onChange={handleChangeMaxAttendees}
                                    />
                                </Fragment>
                            )}
                        </InputsGroup>
                        <InputsGroup>
                            <InputField
                                required
                                size="small"
                                name='title'
                                label='Title'
                                value={data.title}
                                error={errors.title !== ''}
                                helperText={errors.title}
                                onChange={handleChangeTitle}
                            />
                            <InputFormControl size="small" required>
                                <InputLabel id="host-select-label">Host</InputLabel>
                                <Select
                                    labelId="host-select-label"
                                    id="host-select"
                                    value={data.hostId}
                                    label="Host"
                                    onChange={handleChangeHostId}
                                >
                                    {members.map(({ id, firstName, lastName, email }, index) => (
                                        <MenuItem key={index} value={id}>{firstName} {lastName} ({email})</MenuItem>
                                    ))}
                                </Select>
                            </InputFormControl>
                        </InputsGroup>
                        <InputField
                            required
                            size="small"
                            name='description'
                            label='Description'
                            multiline
                            rows={4}
                            value={data.description}
                            error={errors.description !== ''}
                            helperText={errors.description}
                            onChange={handleChangeDescription}
                        />
                        <InputsGroup>
                            <InputField
                                required
                                type="datetime-local"
                                size="small"
                                name='startDate'
                                label='Start date'
                                value={data.startDate}
                                error={errors.startDate !== ''}
                                helperText={errors.startDate}
                                onChange={handleChangeStartDate}
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <InputField
                                type="datetime-local"
                                size="small"
                                name='endDate'
                                label='End date'
                                value={data.endDate}
                                error={errors.endDate !== ''}
                                helperText={errors.endDate}
                                onChange={handleChangeEndDate}
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </InputsGroup>
                        <InputFormControl size="small" fullWidth required>
                            <InputLabel id="tags-select-label">Tags</InputLabel>
                            <Select
                                labelId="tags-select-label"
                                id="tags-select"
                                multiple
                                value={data.tags}
                                onChange={handleChangeTags}
                                input={<OutlinedInput label="Tags" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 240
                                        },
                                    },
                                }}
                            >
                                {tags.map(({ name }, index) => (
                                    <MenuItem key={index} value={name}>
                                        <Checkbox checked={data.tags.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </InputFormControl>
                        <DragAndDropZone {...getRootImageProps()}>
                            <Input {...getInputImageProps()} />
                            {isDragImageActive ? <Text>Drop the event image here ...</Text> : <Text>Drag 'n' drop the event image here, or click to select it</Text>}
                        </DragAndDropZone>
                        {
                            imagePreview && (
                                <ImageContainer>
                                    <Image src={imagePreview} alt="Preview" />
                                    <CancelIconButton size="small" onClick={handleCancelImage}>
                                        <FaTimes />
                                    </CancelIconButton>
                                </ImageContainer>
                            )
                        }
                        <DragAndDropZone {...getRootGalleryProps()}>
                            <Input {...getInputGalleryProps()} />
                            {isDragGalleryActive ? <Text>Drop the event gallery here ...</Text> : <Text>Drag 'n' drop the event gallery here, or click to select it</Text>}
                        </DragAndDropZone>
                        {
                            galleryPreviews.length > 0 && (
                                <GalleryContainer>
                                    {galleryPreviews.map((preview, index) => (
                                        <GalleryImageContainer key={index}>
                                            <GalleryImage src={preview} alt={`Preview ${index + 1}`} />
                                            <CancelIconButton onClick={() => handleRemovePreview(index)} size="small">
                                                <FaTimes />
                                            </CancelIconButton>
                                        </GalleryImageContainer>
                                    ))}
                                </GalleryContainer>
                            )
                        }
                        <MapWrapper>
                            <CreateEventMap
                                markers={markers}
                                setMarkers={setMarkers}
                            />
                        </MapWrapper>
                        <SubmitButtonWrapper>
                            <SubmitButton type='submit' variant="contained" loading={isLoading} disabled={isDisabled}>
                                Create event
                            </SubmitButton>
                        </SubmitButtonWrapper>
                    </Form>
                </FormWrapper>
            </InnerContainer>
        </MainContainer >
    )
}

export default CreateEvent;