import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import Input from '.';
import PropTypes from 'prop-types';
import React from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {colors} from '../../theme/colors';

const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        outline: 'none',
        margin: 0,
        fontSize: '0.85rem',
        fontWeight: 400,
        borderRadius: '4px',
        backgroundColor: colors.white,
        fontFamily: 'aino-regular',
        padding: '0 0.5rem',
        border: (props) => (props.error ? `solid 1px ${colors.red}` : `solid 1px ${colors.black}`),
        '&:focus': {
            borderColor: (props) => (props.error ? colors.red : colors.blue),
        },
        '&:hover': {
            borderColor: (props) => (props.error ? colors.red : colors.blue),
        },
    },
    iconContainer: {
        width: '10%',
        '& svg':{
          color:  colors.blueLight1,
        }
    },
    label: {
        marginBottom: '5px',
        fontSize: '0.85rem',
        fontWeight: 400,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        width: '100%',
        fontFamily: 'aino-regular',
        border: 'none',
        '& ::placeholder': {
            color: (props) => (props.error ? `solid 1px ${colors.red}` : `solid 1px ${colors.blueLight1}`),
            opacity: 1,
            fontSize: '0.75rem',
        },
    },
});

const InputWithLabelIcon = ({ label, error, icon, inputRegister, errorMsg, iscompulsory, name, ...props }) => {
    const classes = useStyles({ error: errorMsg?.message ? true : false });
    console.log("errorMsg", errorMsg)
    return (
        <Box>
             <Typography className={classes.label}>
                {label} {iscompulsory && <span className={classes.red}>*</span>}
            </Typography>
            <Grid
                container
                alignItems="center"
                justify="center"
                wrap="nowrap"
                component="div"
                tabIndex="0"
                className={classes.wrapper}
            >
                <Box className={classes.inputContainer}>
                    <Input
                        error={errorMsg?.message ? true : false}
                        inputRegister={inputRegister}
                        name={name}
                        {...props}
                        className={classes.input}
                    />
                </Box>
                <Grid container alignItems="center" justify="center" className={classes.iconContainer}>
                    {icon}
                </Grid>
            </Grid>
            <ErrorMessage errorMsg={errorMsg?.message} />
        </Box>
    );
};

InputWithLabelIcon.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element,
    inputRegister: PropTypes.element,
    name: PropTypes.string,
    error: PropTypes.bool,
    errorMsg: PropTypes.object,
    iscompulsory:  PropTypes.bool
};
export default InputWithLabelIcon;
