import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

interface Props {
  comment: any;
  user: any;
}

const useStyles = makeStyles(
  createStyles({
    root: {
      marginTop: "2%",
      padding: "1.5%",
      width: "80%",
      borderRadius: "50px",
      background: "linear-gradient(to right, #e0eafc, #cfdef3)",
    },
    title: {
      fontSize: "28px",
      fontWeight: 500,
    },
    content: {
      fontSize: "20px",
    },
    media: {
      height: 0,
    },
  }),
);

const CommentView: React.FC<Props> = ({ comment, user }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt={user?.FullName} src={user?.AvatarImage} />}
        title={<span className={classes.title}>{user?.FullName}</span>}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <span className={classes.content}>{comment?.Content}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentView;
