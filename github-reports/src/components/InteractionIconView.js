import React, { useEffect, useState, useRef } from 'react';
import { Box, Text } from '@primer/react';
import styles from './InteractionIconView.module.css';
import interactionTypes from './interactionTypes.json';
import {
  FileIcon, BookIcon, GlobeIcon, OrganizationIcon, ProjectIcon, ReportIcon, MortarBoardIcon,
  FileMediaIcon, CommentDiscussionIcon, PencilIcon, MarkGithubIcon, LawIcon, ShieldIcon,
  LightBulbIcon, NoteIcon, QuestionIcon, BriefcaseIcon, MegaphoneIcon,
  FileSubmoduleIcon, ArchiveIcon, TagIcon, RocketIcon, ShieldCheckIcon
} from '@primer/octicons-react';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

const InteractionIconView = ({ interactions }) => {
  const [icons, setIcons] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [showTooltip, setShowTooltip] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tooltipContent, setTooltipContent] = useState({});
  const target = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const iconMap = {
      book: BookIcon,
      'file-text': FileIcon,
      globe: GlobeIcon,
      organization: OrganizationIcon,
      project: ProjectIcon,
      report: ReportIcon,
      'mortar-board': MortarBoardIcon,
      'file-media': FileMediaIcon,
      'comment-discussion': CommentDiscussionIcon,
      pencil: PencilIcon,
      'mark-github': MarkGithubIcon,
      law: LawIcon,
      shield: ShieldIcon,
      'light-bulb': LightBulbIcon,
      note: NoteIcon,
      question: QuestionIcon,
      file: FileIcon,
      briefcase: BriefcaseIcon,
      megaphone: MegaphoneIcon,
      'file-submodule': FileSubmoduleIcon,
      archive: ArchiveIcon,
      tag: TagIcon,
      rocket: RocketIcon,
      'shield-check': ShieldCheckIcon
    };

    const interactionIcons = {};
    for (const [key, value] of Object.entries(interactionTypes)) {
      interactionIcons[key] = iconMap[value.icon];
    }
    setIcons(interactionIcons);
  }, []);

  const shortenName = (name, maxLength = 15) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
  };

  const handleMouseEnter = (interaction, event) => {
    const IconComponent = icons[interaction.interaction_type] || FileIcon;
    setTooltipContent({ ...interaction, IconComponent });
    setShowTooltip(true);
    target.current = event.currentTarget;
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Box className={styles.iconViewContainer}>
      {interactions.map((interaction, index) => {
        const IconComponent = icons[interaction.interaction_type] || FileIcon;
        return (
          <Tooltip
            key={index}
            title={
              <Box className={styles.tooltip}>
                <Box className={styles.tooltipItem}>
                  <Text className={styles.tooltipHeading}>Interaction Type</Text>
                  <Box className={styles.tooltipContent}>
                    <IconComponent size={12} className={styles.tooltipIcon} /> {/* Shrink icon size */}
                    <Text className={styles.tooltipText}>{interaction.interaction_type}</Text>
                  </Box>
                </Box>
                <Box className={styles.tooltipItem}>
                  <Text className={styles.tooltipHeading}>Name</Text>
                  <Box className={styles.tooltipContent}>
                    <FileIcon size={12} className={styles.tooltipIcon} /> {/* Shrink icon size */}
                    <Text className={styles.tooltipText}>{shortenName(interaction.name, 20)}</Text> {/* Truncate name */}
                  </Box>
                </Box>
                <Box className={styles.tooltipItem}>
                  <Text className={styles.tooltipHeading}>Reading Time</Text>
                  <Box className={styles.tooltipContent}>
                    <BookIcon size={12} className={styles.tooltipIcon} /> {/* Shrink icon size */}
                    <Text className={styles.tooltipText}>{interaction.reading_time} (min)</Text>
                  </Box>
                </Box>
                <Box className={styles.tooltipItem}>
                  <Text className={styles.tooltipHeading}>Content Type</Text>
                  <Box className={styles.tooltipContent}>
                    <FileMediaIcon size={12} className={styles.tooltipIcon} /> {/* Shrink icon size */}
                    <Text className={styles.tooltipText}>{interaction.content_type}</Text>
                  </Box>
                </Box>
              </Box>
            }
            placement="right"
            followCursor
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '4px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  fontSize: '9px',
                  padding: '8px',
                  width: '200px',
                  textAlign: 'left',
                },
                '& .MuiTooltip-arrow': {
                  color: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                },
              },
            }}
          >
            <Box
              className={styles.iconItem}
              onMouseEnter={(e) => handleMouseEnter(interaction, e)}
              onMouseLeave={handleMouseLeave}
            >
              <Box className={styles.iconWrapper}>
                <FileIcon size={52} /> {/* Main file icon */}
                <Box className={styles.miniIconWrapper}>
                  <IconComponent size={20} /> {/* Mini icon */}
                </Box>
              </Box>
              <Text as="p" className={styles.iconText}>
                {shortenName(interaction.name)}
              </Text>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default InteractionIconView;