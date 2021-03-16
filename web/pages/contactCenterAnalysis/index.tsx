import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

import ProductChips from "../../components/ProductChips";
import { useTranslation } from "../../hooks/useTranslation";
import { demos } from "../../src/demos";
import Recorder from "../../components/Recorder";
import { analyze, Response } from "../../src/api/contactCenterAnalysis";
import NaturalLanguageAnnotatedResult from "../../components/NaturalLanguageAnnotatedResult";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    description: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    responses: {
      marginTop: theme.spacing(4),
      width: 800,
    },
  })
);

const demo = demos["contactCenterAnalysis"];

const ContactCenterAnalysis: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [responses, setResponses] = useState<Response[]>([]);

  const addResult = (response: Response) =>
    setResponses((responses) => [response, ...responses]);

  const languages = ["en-US", "ja-JP"];

  const onStop = async (lang: string, blob: Blob): Promise<void> => {
    try {
      const res = await analyze(lang, blob);
      addResult(res);
    } catch (e) {
      // alert(e);
      console.error(e);
    }
  };

  return (
    <main className={classes.root}>
      <Typography variant="h3" component="h2" className={classes.title}>
        {t.contactCenterAnalysis.title}
      </Typography>
      <ProductChips productIds={demo.products} />
      <Typography
        variant="subtitle1"
        component="p"
        className={classes.description}
      >
        {t.contactCenterAnalysis.description}
      </Typography>
      <Recorder onStop={onStop} languages={languages} defaultLanguage="en-US" />
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.responses}
      >
        {responses.map((res, i) => (
          <Grid item xs={12} key={i}>
            <NaturalLanguageAnnotatedResult result={res} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.responses}></div>
    </main>
  );
};

export default ContactCenterAnalysis;