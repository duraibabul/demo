import {
  ButtonBase,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { useTranslationFn } from "../../hooks/useTranslation";
import { demos } from "../../src/demos";
import ProductChips from "../ProductChips";

type Props = {
  demoId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: "100%",
      height: "100%",
    },
    paper: {
      cursor: "pointer",
      padding: theme.spacing(2),
      textAlign: "left",
      width: "100%",
      height: "100%",
    },
    demoTitle: {
      fontSize: "1.5rem",
    },
    demoIcon: {
      borderRadius: "10%",
    },
  })
);

const DemoCard: React.FC<Props> = ({ demoId }) => {
  const router = useRouter();
  const classes = useStyles();
  const { t } = useTranslationFn();

  const demo = demos[demoId];

  const description = t(`${demoId}.description`);
  const title = t(`${demoId}.title`);

  const [hovered, setHovered] = useState(false);

  const onClick = () => {
    if (demo.link) {
      window.open(demo.link, "_blank", "noopener,noreferrer");
    } else {
      void router.push(demo.path, demo.path);
    }
  };

  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);

  return (
    <ButtonBase focusRipple className={classes.button}>
      <Paper
        className={classes.paper}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        elevation={hovered ? 5 : 1}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={3}>
            <Image
              src={demo.icon}
              alt={title}
              width={128}
              height={128}
              className={classes.demoIcon}
            />
          </Grid>
          <Grid item xs={9}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item>
                <Typography
                  className={classes.demoTitle}
                  component="h2"
                  variant="h2"
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  {description}
                </Typography>
              </Grid>
              <Grid item>
                <ProductChips productIds={demo.products} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ButtonBase>
  );
};

export default DemoCard;
