import React, { useState, useEffect } from 'react';
import { withStyles, WithStylesProps } from 'react-with-styles';
import {useTransition, animated} from 'react-spring'

import { FastDatasetCleanerThemeType } from '../theme/FastDatasetCleanerTheme';
import Button from './elements/Button';


const design = 
"─────────────────╔╗───╔╗───╔╗──────────╔╗\n" +
"────────────────╔╝╚╗──║║──╔╝╚╗─────────║║\n" +
"╔══╦══╦═╗╔══╦═╦═╩╗╔╬╗╔╣║╔═╩╗╔╬╦══╦═╗╔══╣║\n" +
"║╔═╣╔╗║╔╗╣╔╗║╔╣╔╗║║║║║║║║╔╗║║╠╣╔╗║╔╗╣══╬╝\n" +
"║╚═╣╚╝║║║║╚╝║║║╔╗║╚╣╚╝║╚╣╔╗║╚╣║╚╝║║║╠══╠╗\n" +
"╚══╩══╩╝╚╩═╗╠╝╚╝╚╩═╩══╩═╩╝╚╩═╩╩══╩╝╚╩══╩╝\n" +
"─────────╔═╝║────────────────────────────\n" +
"─────────╚══╝────────────────────────────";

const text =
"🎊🎉👏 Congratulations! 👏🎉🎊 \n\n" +
"You reached the end of your dataset!\n\n" +
"Refresh the page to be sure that you annotated all the images.\n\n" +
" If after a refresh you get here, you're good to go on ! 🏋💻";


type Props = {
    navigationDirection: string;
} & WithStylesProps;

const handleClickButton = () => window.location.reload(false);
const Screen = ({ css, styles }: WithStylesProps) => (
    <div {...css(styles.card)}>
        <p {...css(styles.paragraph)}>{design}</p>
        <p>{text}</p>
        <div {...css(styles.reloadButton)}>
            <Button title="Reload the page" isHidden={false} handleClick={handleClickButton} />
        </div>
    </div>
);


function FinalScreen(props: Props){
    const { navigationDirection } = props;

    const [inView, setInView] = useState(false)
    useEffect(() => {
        setInView(true)
        return () => setInView(false);
    }, []);


    const translationInOut = `translateX(${navigationDirection === 'left' ? '-' : ''}100vw)`;
    const content = {
        from: { opacity: 0, transform: translationInOut },
        enter: { opacity: 1, transform: 'translateX(0)' },
        leave: { opacity: 0, transform: translationInOut },
    };
    const transitions = useTransition(inView, null, content)
    
    return (
        <>
            {transitions.map(({ item, key, props: propsBis}) =>
                item && <animated.div key={key} style={propsBis}>
                    <Screen {...props} />
                </animated.div>
                )
            }
        </>
    );
}


export default withStyles(({ unit, color, fontSize }: FastDatasetCleanerThemeType) => ({
    card: {
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        color: color.reversePage,
        fontSize: fontSize.xlarge,
        whiteSpace: 'pre-line',
        margin: 'auto',
        marginTop: '20vh',
        width: '100vw',
    },
    paragraph: {
        margin: `${4 * unit}px 0`,
    },
    reloadButton: {
        width: '20%',
        margin: 'auto',
    },
}))(FinalScreen);
