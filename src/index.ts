import chalk from 'chalk';
import boxen from 'boxen';

const data = [
  {
    name: 'Basharath',
    headline: 'FullStack Developer | Indie maker',
    about:
      "I'm a full-stack developer with a great interest in solving problems. I'm making one interesting product every month that solves a useful problem in my daily routine.",
    socials: {
      twitter: 'wahVinci',
      linkedin: 'basharathonline',
      producthunt: 'basharath',
      github: 'basharath',
      indiehackers: 'basharath',
      codepen: 'basharath',
    },
    links: {
      website: 'https://devapt.com',
      portfolio: 'https://basharath.github.io',
    },
    username: 'basharath',
  },
];

interface DATA_TYPE {
  name: string;
  headline?: string;
  about?: string;
  socials: {
    [k: string]: string;
  };
  links: {
    [k: string]: string;
  };
  username: string;
}

const username = process.argv.slice(2)[0]?.toLowerCase();

if (!username) {
  console.log('Please update your data');
  process.exit(1);
}

const userData = data.filter((d) => d.username.toLowerCase() === username);

if (userData.length < 1) {
  console.log('No user found');
  process.exit(1);
}

const { name, socials, links, headline, about } = userData[0];

const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

const getSocialLink = (social: string, user: string) => {
  if (social === 'twitter') return `https://twitter.com/${user}`;
  if (social === 'github') return `https://github.com/${user}`;
  if (social === 'linkedin') return `https://www.linkedin.com/in/${user}`;
  if (social === 'producthunt') return `https://www.producthunt.com/@${user}`;
  if (social === 'indiehackers') return `https://www.indiehackers.com/${user}`;
  if (social === 'codepen') return `https://codepen.io/${user}`;
  if (social === 'facebook') return `https://www.facebook.com/${user}`;
  if (social === 'reddit') return `https://www.reddit.com/user/${name}`;

  return user;
};

const socialLinks = Object.entries(socials)
  .map((d) => {
    if (!d[1]) return;
    return `${capitalize(d[0])}: ${chalk.green(getSocialLink(d[0], d[1]))}`;
  })
  .filter(Boolean)
  .join('\n');

const otherLinks = Object.entries(links)
  .map((d) => {
    return `${capitalize(d[0])}: ${chalk.green(d[1])}`;
  })
  .join('\n');

const template = '1';

const aboutData = () => {
  if (about) {
    return `${chalk.bgBlue('About me')}\n${chalk.gray(about)}\n`;
  } else return '';
};

console.log(
  boxen(
    [
      chalk.hex('#a78bfa').bold(name),
      `${chalk.dim(headline)}` + '\n',
      aboutData(),
      `${chalk.bgBlue('Socials')}`,
      socialLinks + '\n',
      `${chalk.bgBlue('Links')}`,
      otherLinks,
    ]
      .filter((d) => d)
      .join('\n'),
    {
      margin: 1,
      padding: 1,
      float: 'center',
      borderStyle: 'double',
      borderColor: '#c084fc',
      // title: 'Bio',
      // titleAlignment: 'center',
    }
  ),
  '\n',
  chalk.dim('Create your own bio shot at: https://github.com/basharath/')
);
