import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import wordsToNumber from 'words-to-numbers';

const alankey = ALAN_API_KEY;

const App = () => {
	const [newsArticles, setNewsArticles] = useState([]);
	const [activeArticle, setActiveArticle] = useState(-1);
	const classes = useStyles();
	useEffect(() => {
		alanBtn({
			key: alankey,
			onCommand: ({ command, articles, number }) => {
				if (command === 'newHeadlines') {
					setNewsArticles(articles);
					setActiveArticle(-1);
				} else if (command === 'highlight') {
					setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
				} else if (command === 'open') {
					const parsedNumber =
						number.length > 2 ? wordsToNumber(number, { fuzzy: true }) : number;
					const article = articles[parsedNumber - 1];
					if (parsedNumber > 20) {
						alanBtn().playText('Please try that again.');
					} else if (article) {
						window.open(article.url, '_blank');
						alanBtn.playText('Opeaning...');
					}
				}
			},
		});
	}, []);
	return (
		<div>
			<div className={classes.logoContainer}>
				<img
					src='https://www.analyticsinsight.net/wp-content/uploads/2020/04/Main-image-1024x683.jpg'
					className={classes.alanLogo}
					alt='alan logo'
				/>
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle} />
		</div>
	);
};

export default App;
