import React from "react";
import cx from "clsx";
// import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ChevronRightRounded from "@mui/material/Icon";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
// import { n01TextInfoContentStyles } from "@mui-treasury/styles";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";

// const useStyles = makeStyles(() => ({
//   root: {
//     maxWidth: 304,
//     width: 400,
//     margin: "auto",
//     boxShadow: "none",
//     borderRadius: 30
//   },
//   content: {
//     padding: 24
//   },
//   cta: {
//     marginTop: 24,
//     textTransform: "initial"
//   }
// }));

/*interface CardNews {
  hasImg?:boolean;
  srcImg: string;
  width?: number;
  hasTitle?: boolean;
  title: string;
  hasDescription?: boolean;
  description: string;
  hasStars?: boolean;
  hasLink?: boolean;
  borderRadius?: number;
}*/

/*defaultProps {
  width: 400,
  borderRadius: 30,
  hasTitle: false,
  hasStars: false,
  hasImg: false,
  hasLink: false,
}*/
export default function MenuCardCarousel(props) {
//   const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
//   const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();
  const n = 6;

  return (
    <Card style={{width: "70vh", height: "50vh"}}>

      <CardContent>

        {/*<Star height="20px" />
        <Star height="20px" />
        <Star height="20px" />
        <Star height="20px" />
      <Star height="20px" />*/}
        <TextInfoContent
        //   classes={textCardContentStyles}
          heading={props.mealtype}
          body={props.content}
        />
      </CardContent>
    </Card>
  );
};


