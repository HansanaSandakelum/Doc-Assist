import {Card, List, ListItem, ListItemText, Skeleton} from '@mui/material';

const SkeletonUserInfoCard = () => (
    <Card sx={{p: 2}}>
        <List sx={{py: 0}}>
            <ListItem alignItems="center" disableGutters sx={{py: 0}}>
                <ListItemText
                    sx={{py: 0}}
                    primary={<Skeleton variant="rectangular" height={20}/>}
                    secondary={<Skeleton variant="text"/>}
                />
            </ListItem>
        </List>
    </Card>
);

export default SkeletonUserInfoCard;