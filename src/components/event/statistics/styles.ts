import { styled } from '@mui/material/styles';
import {
    Paper,
    Typography
} from '@mui/material';

export const StatisticsContainer = styled(Paper)({
    padding: '16px',
    gap: '12px',
    display: 'flex',
    borderRadius: '0',
    flexDirection: 'column'
});

export const SectionTitle = styled(Typography)({
    fontWeight: '700',
    fontSize: '1rem'
});

export const StatisticsSection = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
});

export const StatItem = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

export const TagsContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
});

export const Tag = styled('div')({
    backgroundColor: '#e0e0e0',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '0.85rem',
});