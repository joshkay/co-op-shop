import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, 
  List as MuiList,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Button
} from '@material-ui/core';
import { List } from '../../store/lists/types';
import NewListForm from './NewListForm';

const styles = (theme: Theme) => createStyles({
  main: 
  {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]:
    {
      padding: 2 * theme.spacing.unit,
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
    display: 'flex'
  }
});

interface Props extends WithStyles<typeof styles>
{
  allowAdd?: boolean;
  header: string;
  isAdding?: boolean;
  error?: string | null;
  addList?: (name: string) => void;
  lists: List[];
}

interface State
{
  showNewList: boolean;
}

class ShoppingListsGroup extends Component<Props, State>
{
  constructor(props: Props)
  {
    super(props);

    this.state = {
      showNewList: false
    };

    this.handleNewListVisibility = this.handleNewListVisibility.bind(this);
    this.handleNewListCancel = this.handleNewListCancel.bind(this);
  }

  handleNewListVisibility()
  {
    this.setState({
      showNewList: true
    });
  }

  handleNewListCancel()
  {
    this.setState({
      showNewList: false
    });
  }

  componentDidUpdate(oldProps: Props)
  {
    // item was added successfully if isAdding changed from true -> false with no error
    if (!this.props.error && oldProps.isAdding && !this.props.isAdding)
    {
      this.setState({
        showNewList: false
      });
    }
  }

  render()
  {
    const { classes, header, lists, allowAdd, addList, isAdding } = this.props;
    const { showNewList } = this.state;

    const listItems = lists ? lists.map((list, index) =>
    (
      <Link to={`/list/${list.id}`} key={index} className={classes.link}>
        <ListItem button>
          <ListItemText
            primary={list.name}
          />
        </ListItem>
      </Link>
    )) : null;

    const addButton = allowAdd && !showNewList ? (
      <Button color="primary" variant="contained" onClick={this.handleNewListVisibility}
        data-cy="newList">
        New List
      </Button>
    ) : null;

    const addListListItem = addList && showNewList ? (
      <ListItem>
        <NewListForm addList={addList} cancel={this.handleNewListCancel} 
          form="NewItem" multiline={false} />
      </ListItem>
    ) : null;

    const listPaper = lists.length > 0 || showNewList ? (
      <Grid item xs={12}>
        <Paper>
          <MuiList>
            {addListListItem}
            {listItems}
          </MuiList>
        </Paper>
      </Grid>
    ) : null;

    return (
      <Grid container alignItems='center'>
        <Grid item>
          <Typography className={classes.main} variant="h4">
            {header}
          </Typography>
        </Grid> 
        {addButton}
        {listPaper}
      </Grid>
    );
  }
}

export default withStyles(styles)(ShoppingListsGroup);