import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import Assets from '@/Assets';
import {
  boxListItemStyles,
  listItemStyles,
  mainStyles,
  nameStyles,
  textStyles,
} from './HelplineCard.styles';

interface IProps {
  mail: string;
  phone: string[];
  info: string;
  time: string;
  languages: string;
  name: string;
}

const HelplineCard: React.FC<IProps> = ({
  info,
  languages,
  mail,
  phone,
  time,
  name,
}) => {
  return (
    <Box sx={mainStyles}>
      <Typography variant="h4" component="h4" sx={nameStyles}>
        {name}
      </Typography>
      <List disablePadding>
        <ListItem sx={listItemStyles}>
          <Box
            component="img"
            src={Assets.mailIcon}
            width={24}
            height={22}
            alt="Mail icon"
            sx={boxListItemStyles}
          />
          <Typography sx={textStyles}>{mail}</Typography>
        </ListItem>
        <ListItem sx={listItemStyles}>
          <Box
            component="img"
            src={Assets.phoneIcon}
            width={24}
            height={22}
            alt="Phone icon"
            sx={boxListItemStyles}
          />
          <Box>
            {phone.map((item: string) => (
              <Typography sx={textStyles}>{item}</Typography>
            ))}
          </Box>
        </ListItem>
        <ListItem sx={listItemStyles}>
          <Box
            component="img"
            src={Assets.homeIcon}
            width={24}
            height={22}
            alt="Home icon"
            sx={boxListItemStyles}
          />
          <Typography sx={textStyles}>{info}</Typography>
        </ListItem>
        <ListItem sx={listItemStyles}>
          <Box
            component="img"
            src={Assets.clockIcon}
            width={24}
            height={22}
            alt="Clock icon"
            sx={boxListItemStyles}
          />
          <Typography sx={textStyles}>{time}</Typography>
        </ListItem>
        <ListItem sx={listItemStyles}>
          <Box
            component="img"
            src={Assets.talkIcon}
            width={24}
            height={22}
            alt="Talk icon"
            sx={boxListItemStyles}
          />
          <Typography sx={textStyles}>{languages}</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default HelplineCard;
