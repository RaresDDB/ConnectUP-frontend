import { useAppSelector } from '../../../store';
import {
    Divider,
    Typography
} from '@mui/material';
import {
    Tag,
    StatItem,
    SectionTitle,
    TagsContainer,
    StatisticsSection,
    StatisticsContainer
} from './styles';

const EventStatistics = () => {
    const event = useAppSelector((state) => state.events.event);

    if (!event) {
        return null;
    }

    const ageStats = Object.entries(event.attendanceStats.byAge).map(([group, percentage]) => ({
        group,
        percentage
    }));

    const genderStats = Object.entries(event.attendanceStats.byGender).map(([gender, percentage]) => ({
        gender,
        percentage
    }));

    const topTags = event.attendanceStats.topTags.map(tag => ({
        name: tag
    }));

    return (
        <StatisticsContainer elevation={1}>
            <SectionTitle variant="h6">Statistics</SectionTitle>
            <StatisticsSection>
                <Typography variant="subtitle2" fontWeight="medium">Attendance by age</Typography>
                {ageStats.map((stat, index) => (
                    <StatItem key={index}>
                        <Typography variant="body2">{stat.group}</Typography>
                        <Typography variant="body2" fontWeight="medium">{stat.percentage}%</Typography>
                    </StatItem>
                ))}
            </StatisticsSection>
            <Divider />
            <StatisticsSection>
                <Typography variant="subtitle2" fontWeight="medium">Attendance by gender</Typography>
                {genderStats.map((stat, index) => (
                    <StatItem key={index}>
                        <Typography variant="body2">{stat.gender}</Typography>
                        <Typography variant="body2" fontWeight="medium">{stat.percentage}%</Typography>
                    </StatItem>
                ))}
            </StatisticsSection>
            <Divider />
            <StatisticsSection>
                <Typography variant="subtitle2" fontWeight="medium">Top 3 tags</Typography>
                <TagsContainer>
                    {topTags.map((tag, index) => (
                        <Tag key={index}>{tag.name}</Tag>
                    ))}
                </TagsContainer>
            </StatisticsSection>
        </StatisticsContainer>
    );
};

export default EventStatistics;