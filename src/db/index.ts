import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import User from "../models/user.model";
import Contract from "../models/contract.model";
import Company from "../models/company.model";
import Person from "../models/person.model";
import ActivationDate from "../models/activation-date.model";
import Category from "../models/category.model";
import ComplianceMeasure from "../models/compliance-measure.model";
import ContentElement from "../models/content-element.model";
import Copyright from "../models/copyright.model";
import RequestCopyright from "../models/request-copyright.model";
import RequestCopyrightActivationDate from "../models/request-copyright-activation-date.model";
import RequestCopyrightComplianceMeasure from "../models/request-copyright-compliance-measure.model";
import RequestCopyrightContentElement from "../models/request-copyright-content-element.model";
import RequestCopyrightGeograficScope from "../models/request-copyright-geografic-scope.model";
import RequestCopyrightMediaChannel from "../models/request-copyright-media-channel.model";
import RequestCopyrightMetric from "../models/request-copyright-metric.model";
import GeograficScope from "../models/geografic-scope.model";
import MediaChannel from "../models/media-channel.model";
import Metric from "../models/metric.model";
import RequestCopyrightAssignment from "../models/request-copyright-assignment.model";
import File from "../models/file.model";
import RequestCopyrightHistory from "../models/request-copyright-history.model";
import Token from "../models/token.model";
import { logger } from "../config/logger";
import Power from "../models/power.model";
import Comment from "../models/comment.model";
import Post from "../models/post.model";
import Follower from "../models/follower.model";
import View from "../models/view.model";
import Endorse from "../models/endorse.model";
import Article from "../models/article.model";
import Idea from "../models/idea.model";
import NewsFeed from "../newsFeed";
import EndorseView from "../models/endorse-view.model";
import UserAgreement from "../models/user-agreement.model";
import Agreement from "../models/agreement.model";
import UserSettings from "../models/user-settings.model";
import Showcase from "../models/showcase.model";
import Tag from "../models/tag.model";
import ShowcaseTag from "../models/showcase-tag.model";
import Collaboration from "../models/collaboration.model";
import CollaborationTag from "../models/collaboration-tag.model";
import CollaborationCategory from "../models/collaboration-category.model";
import CollaborationRequest from "../models/collaboration-request.model";
import Notification from "../models/notification.model";
import Country from "../models/country.model";
import Industry from "../models/industry.model";
import City from "../models/city.model";
import State from "../models/state.model";
import Address from "../models/address.model";
import path from "path";
import fs from "fs";
import { where } from "sequelize";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase()
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      logging: false,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      models: [
        User,
        UserSettings,
        Contract,
        Company,
        Person,
        ActivationDate,
        Category,
        ComplianceMeasure,
        ContentElement,
        Copyright,
        RequestCopyright,
        RequestCopyrightActivationDate,
        RequestCopyrightComplianceMeasure,
        RequestCopyrightContentElement,
        RequestCopyrightGeograficScope,
        RequestCopyrightMediaChannel,
        RequestCopyrightMetric,
        GeograficScope,
        MediaChannel,
        Metric,
        RequestCopyrightAssignment,
        File,
        RequestCopyrightHistory,
        UserAgreement,
        Agreement,
        Token,
        Post,
        Power,
        Article,
        Idea,
        Comment,
        Endorse,
        Follower,
        View,
        EndorseView,
        Showcase,
        Tag,
        ShowcaseTag,
        Collaboration,
        CollaborationTag,
        CollaborationCategory,
        CollaborationRequest,
        Notification,
        Country,
        Industry,
        City,
        State,
        Address,
      ]
    });

    await this.sequelize
      .authenticate()
      .then(async () => {
        logger.info("Connection has been established successfully.");
        await this.sync();
      })
      .catch((err) => {
        logger.error("Unable to connect to the Database:", err);
      });
  }

  public async sync() {
    this.sequelize?.sync({ force: false, alter: true }).then(async (value) => {
      this.insertInitialTermsAndConditions();
      this.insertInitialValuesCategory();
      this.insertInitialValuesCollaborationCategory();
      this.insertInitialValuesActivationDate()
      this.insertInitialValuesCompliance();
      this.insertInitialValuesContentElement();
      this.insertInitialValuesGeografic();
      this.insertInitialValuesMediaChannel();
      this.insertInitialValuesMetrics();
      this.insertInitialValuesUsers();
      //this.insertInitialValuesCopyright();

      new NewsFeed();
      
      //this.addCountries();
      //this.addStates();
      //this.addCities();
    })
  }

  insertInitialValuesCategory() {
    Category.sync().then(() => {
      Category.findAll().then(async value => {
        if (!value || value.length == 0) {
          await Category.create({
            name: 'Technology & Innovation'
          });
          await Category.create({
            name: 'Health & Wellness'
          });
          await Category.create({
            name: 'Education & Learning'
          });
          await Category.create({
            name: 'Entertainment & Media'
          });
          await Category.create({
            name: 'Arts & Culture'
          });
          await Category.create({
            name: 'Social Impact & Sustainability'
          });
          await Category.create({
            name: 'Finance & Fintech'
          });
          await Category.create({
            name: 'E-commerce & Retail'
          });
          await Category.create({
            name: 'Travel & Hospitality'
          });
          await Category.create({
            name: 'Food & Beverage'
          });
          await Category.create({
            name: 'Fashion & Style'
          });
          await Category.create({
            name: 'Gaming & Recreation'
          });
          await Category.create({
            name: 'Sports & Fitness'
          });
          await Category.create({
            name: 'Home & Lifestyle'
          });
          await Category.create({
            name: 'Environment & Green Tech'
          });
          await Category.create({
            name: 'Science & Research'
          });
          await Category.create({
            name: 'Personal Development'
          });
          await Category.create({
            name: 'Mobile Apps & Software'
          });
          await Category.create({
            name: 'Artificial Intelligence'
          });
          await Category.create({
            name: 'Augmented Reality'
          });
          await Category.create({
            name: 'Virtual Reality'
          });
          await Category.create({
            name: 'Robotics'
          });
          await Category.create({
            name: 'Internet of Things (IoT)'
          });
          await Category.create({
            name: 'Biotechnology'
          });
          await Category.create({
            name: 'Renewable Energy'
          });
        }
      })
    });
  }

  insertInitialValuesCollaborationCategory() {
    try {
      CollaborationCategory.sync().then(() => {
        CollaborationCategory.findAll().then(async value => {
          if (!value || value.length == 0) {
            var father = await CollaborationCategory.create({
              name: 'Developer'
            });

            await CollaborationCategory.create({
              name: 'Backend Developer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Frontend Developer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Full-Stack Developer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Mobile App Developer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Software Engineer',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Designer'
            });

            await CollaborationCategory.create({
              name: 'Graphic Designer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'UI/UX Designer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Web Designer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Product Designer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Animator',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Creative'
            });

            await CollaborationCategory.create({
              name: 'Writer/Content Creator',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Copywriter',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Photographer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Videographer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Musician',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Business and Strategy'
            });

            await CollaborationCategory.create({
              name: 'Business Analyst',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Marketing Specialist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Project Manager',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Entrepreneur',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Strategist',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Tech Specialist'
            });

            await CollaborationCategory.create({
              name: 'Data Scientist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'AI/Machine Learning Expert',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Blockchain Developer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Cybersecurity Specialist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'IT Support',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Management'
            });

            await CollaborationCategory.create({
              name: 'Team Lead',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Project Manager',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Product Manager',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Operations Manager',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Executive',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Legal and Compliance'
            });

            await CollaborationCategory.create({
              name: 'Intellectual Property Lawyer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Contract Specialist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Compliance Officer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Legal Advisor',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Finance'
            });

            await CollaborationCategory.create({
              name: 'Financial Analyst',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Accountant',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Investment Advisor',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'CFO',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Marketing'
            });

            await CollaborationCategory.create({
              name: 'Digital Marketer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Social Media Manager',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'SEO Specialist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Content Marketer',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Health and Science'
            });

            await CollaborationCategory.create({
              name: 'Medical Researcher',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Biotechnologist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Health Specialist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Scientist',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Education'
            });

            await CollaborationCategory.create({
              name: 'Education Specialist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Instructional Designer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'EdTech Developer',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Academic Researcher',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Community and Support'
            });

            await CollaborationCategory.create({
              name: 'Community Manager',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Customer Support',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Moderator',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Evangelist',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Environment and Sustainability'
            });

            await CollaborationCategory.create({
              name: 'Environmental Scientist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Sustainability Specialist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Conservationist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Green Energy Expert',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Artisan and Crafts'
            });

            await CollaborationCategory.create({
              name: 'Artisan',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Craftsman',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Sculptor',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Handmade Crafts Expert',
              fatherId: father.id
            });

            father = await CollaborationCategory.create({
              name: 'Human Resources'
            });

            await CollaborationCategory.create({
              name: 'HR Specialist',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Recruiter',
              fatherId: father.id
            });

            await CollaborationCategory.create({
              name: 'Diversity and Inclusion Specialist',
              fatherId: father.id
            });
          }

        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  insertInitialValuesActivationDate() {
    ActivationDate.findAll().then(value => {
      if (!value || value.length == 0) {
        ActivationDate.sync().then(() => {
          ActivationDate.create({
            name: 'Event'
          });
          ActivationDate.create({
            name: 'Webnar'
          });
          ActivationDate.create({
            name: 'Product Lunch'
          });
        });
      }
    })
  }

  insertInitialValuesCompliance() {
    ComplianceMeasure.findAll().then(value => {
      if (!value || value.length == 0) {
        ComplianceMeasure.sync().then(() => {
          ComplianceMeasure.create({
            name: 'Regular Audits'
          });
          ComplianceMeasure.create({
            name: 'Reporting'
          });
        });
      }
    })
  }

  insertInitialValuesContentElement() {
    ContentElement.findAll().then(value => {
      if (!value || value.length == 0) {
        ContentElement.sync().then(() => {
          ContentElement.create({
            name: 'Digital Graphics'
          });
          ContentElement.create({
            name: 'Print Materials'
          });
          ContentElement.create({
            name: 'Video Content'
          });
        });
      }
    })
  }

  insertInitialValuesMediaChannel() {
    MediaChannel.findAll().then(value => {
      if (!value || value.length == 0) {
        MediaChannel.sync().then(() => {
          MediaChannel.create({
            name: 'Digital Platforms'
          });
          MediaChannel.create({
            name: 'Print materials'
          });
        });
      }
    })
  }

  insertInitialValuesGeografic() {
    GeograficScope.findAll().then(value => {
      if (!value || value.length == 0) {
        GeograficScope.sync().then(() => {
          GeograficScope.create({
            name: 'North America'
          });
          GeograficScope.create({
            name: 'Europe'
          });
          GeograficScope.create({
            name: 'Asia'
          });
          GeograficScope.create({
            name: 'South America'
          });
          GeograficScope.create({
            name: 'Central America'
          });
          GeograficScope.create({
            name: 'Africa'
          });
          GeograficScope.create({
            name: 'Oceania'
          });
        });
      }
    })
  }

  insertInitialValuesMetrics() {
    Metric.findAll().then(value => {
      if (!value || value.length == 0) {
        Metric.sync().then(() => {
          Metric.create({
            name: 'Engagement rates'
          });
          Metric.create({
            name: 'Website traffic'
          });
          Metric.create({
            name: 'Social media impressions'
          });
        });
      }
    })
  }

  insertInitialValuesCopyright() {
    Copyright.sync().then(() => {
      Company.findAll().then(companies => {
        companies.forEach(c => {
          Copyright.create({
            name: 'Use of Snow White character',
            companyId: c.id,
            text: "",
          });

          Copyright.create({
            name: 'Use of Cinderella character',
            companyId: c.id,
            text: "",
          });
        })
      });
    });
  }

  insertInitialTermsAndConditions() {
    Agreement.sync().then(() => {
      Agreement.findAll().then(value => {
        if (!value || value.length == 0) {
          Agreement.create({
            name: 'Privacy Policy - 26/12/2023',
            text: `<h1>Privacy Policy</h1>
            <p>Last updated: December 26, 2023</p>
            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</p>
            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h3>Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul>
            <li>
            <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
            </li>
            <li>
            <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
            </li>
            <li>
            <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Endorse an Idea.</p>
            </li>
            <li>
            <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
            </li>
            <li>
            <p><strong>Country</strong> refers to: California,  United States</p>
            </li>
            <li>
            <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
            </li>
            <li>
            <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
            </li>
            <li>
            <p><strong>Service</strong> refers to the Website.</p>
            </li>
            <li>
            <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
            </li>
            <li>
            <p><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</p>
            </li>
            <li>
            <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
            </li>
            <li>
            <p><strong>Website</strong> refers to Endorse an Idea, accessible from <a href="www.endorseanidea.com" rel="external nofollow noopener" target="_blank">www.endorseanidea.com</a></p>
            </li>
            <li>
            <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            </li>
            </ul>
            <h2>Collecting and Using Your Personal Data</h2>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
            <ul>
            <li>
            <p>Email address</p>
            </li>
            <li>
            <p>First name and last name</p>
            </li>
            <li>
            <p>Phone number</p>
            </li>
            <li>
            <p>Address, State, Province, ZIP/Postal code, City</p>
            </li>
            <li>
            <p>Usage Data</p>
            </li>
            </ul>
            <h4>Usage Data</h4>
            <p>Usage Data is collected automatically when using the Service.</p>
            <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
            <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
            <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
            <h4>Information from Third-Party Social Media Services</h4>
            <p>The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:</p>
            <ul>
            <li>Google</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            </ul>
            <p>If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as Your name, Your email address, Your activities or Your contact list associated with that account.</p>
            <p>You may also have the option of sharing additional information with the Company through Your Third-Party Social Media Service's account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.</p>
            <h4>Tracking Technologies and Cookies</h4>
            <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
            <ul>
            <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
            <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
            </ul>
            <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies on <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank">TermsFeed website</a> article.</p>
            <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
            <ul>
            <li>
            <p><strong>Necessary / Essential Cookies</strong></p>
            <p>Type: Session Cookies</p>
            <p>Administered by: Us</p>
            <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
            </li>
            <li>
            <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
            <p>Type: Persistent Cookies</p>
            <p>Administered by: Us</p>
            <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
            </li>
            <li>
            <p><strong>Functionality Cookies</strong></p>
            <p>Type: Persistent Cookies</p>
            <p>Administered by: Us</p>
            <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
            </li>
            </ul>
            <p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
            <h3>Use of Your Personal Data</h3>
            <p>The Company may use Personal Data for the following purposes:</p>
            <ul>
            <li>
            <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
            </li>
            <li>
            <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
            </li>
            <li>
            <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
            </li>
            <li>
            <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
            </li>
            <li>
            <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
            </li>
            <li>
            <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
            </li>
            <li>
            <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
            </li>
            <li>
            <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
            </li>
            </ul>
            <p>We may share Your personal information in the following situations:</p>
            <ul>
            <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
            <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
            <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
            <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
            <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
            <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
            </ul>
            <h3>Retention of Your Personal Data</h3>
            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
            <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
            <h3>Transfer of Your Personal Data</h3>
            <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
            <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
            <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
            <h3>Delete Your Personal Data</h3>
            <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
            <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
            <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
            <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
            <h3>Disclosure of Your Personal Data</h3>
            <h4>Business Transactions</h4>
            <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
            <h4>Law enforcement</h4>
            <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
            <h4>Other legal requirements</h4>
            <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
            <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of Users of the Service or the public</li>
            <li>Protect against legal liability</li>
            </ul>
            <h3>Security of Your Personal Data</h3>
            <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            <h2>Children's Privacy</h2>
            <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
            <p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
            <h2>Links to Other Websites</h2>
            <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
            <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
            <h2>Changes to this Privacy Policy</h2>
            <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
            <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul>
            <li>By email: contact@endorseanidea.com</li>
            </ul>`,
            date: new Date(),
            type: 'Privacy Policy'
          });

          Agreement.create({
            name: 'Terms and Conditions - 26/12/2023',
            text: `<h1>Terms and Conditions</h1>
            <p>Last updated: December 26, 2023</p>
            <p>Please read these terms and conditions carefully before using Our Service.</p>
            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h3>Definitions</h3>
            <p>For the purposes of these Terms and Conditions:</p>
            <ul>
            <li>
            <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
            </li>
            <li>
            <p><strong>Country</strong> refers to: California,  United States</p>
            </li>
            <li>
            <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Endorse an Idea.</p>
            </li>
            <li>
            <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
            </li>
            <li>
            <p><strong>Service</strong> refers to the Website.</p>
            </li>
            <li>
            <p><strong>Terms and Conditions</strong> (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the <a href="https://www.termsfeed.com/terms-conditions-generator/" target="_blank">Terms and Conditions Generator</a>.</p>
            </li>
            <li>
            <p><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>
            </li>
            <li>
            <p><strong>Website</strong> refers to Endorse an Idea, accessible from <a href="https://www.endorseanidea.com" rel="external nofollow noopener" target="_blank">https://www.endorseanidea.com</a></p>
            </li>
            <li>
            <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            </li>
            </ul>
            <h2>Acknowledgment</h2>
            <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
            <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
            <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
            <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
            <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>
            <h2>Links to Other Websites</h2>
            <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
            <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
            <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
            <h2>Termination</h2>
            <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
            <p>Upon termination, Your right to use the Service will cease immediately.</p>
            <h2>Limitation of Liability</h2>
            <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
            <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
            <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>
            <h2>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h2>
            <p>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
            <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
            <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
            <h2>Governing Law</h2>
            <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
            <h2>Disputes Resolution</h2>
            <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
            <h2>For European Union (EU) Users</h2>
            <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>
            <h2>United States Legal Compliance</h2>
            <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
            <h2>Severability and Waiver</h2>
            <h3>Severability</h3>
            <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
            <h3>Waiver</h3>
            <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
            <h2>Translation Interpretation</h2>
            <p>These Terms and Conditions may have been translated if We have made them available to You on our Service.
            You agree that the original English text shall prevail in the case of a dispute.</p>
            <h2>Changes to These Terms and Conditions</h2>
            <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
            <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
            <h2>Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
            <ul>
            <li>By email: contact@endorseanidea.com</li>
            </ul>`,
            date: new Date(),
            type: "Terms and Conditions"
          });

          Agreement.create({
            name: 'Cookies Policy - 26/12/2023',
            text: `<h1>Cookies Policy</h1>
            <p>Last updated: December 26, 2023</p>
            <p>This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used. This Cookies Policy has been created with the help of the <a href="https://www.termsfeed.com/cookies-policy-generator/" target="_blank">Cookies Policy Generator</a>.</p>
            <p>Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy.</p>
            <p>We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.</p>
            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h3>Definitions</h3>
            <p>For the purposes of this Cookies Policy:</p>
            <ul>
            <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers to Endorse an Idea.</li>
            <li><strong>Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses.</li>
            <li><strong>Website</strong> refers to Endorse an Idea, accessible from <a href="https://www.endorseanidea.com" rel="external nofollow noopener" target="_blank">https://www.endorseanidea.com</a></li>
            <li><strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.</li>
            </ul>
            <h2>The use of the Cookies</h2>
            <h3>Type of Cookies We Use</h3>
            <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.</p>
            <p>We use both session and persistent Cookies for the purposes set out below:</p>
            <ul>
            <li>
            <p><strong>Necessary / Essential Cookies</strong></p>
            <p>Type: Session Cookies</p>
            <p>Administered by: Us</p>
            <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
            </li>
            <li>
            <p><strong>Functionality Cookies</strong></p>
            <p>Type: Persistent Cookies</p>
            <p>Administered by: Us</p>
            <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
            </li>
            </ul>
            <h3>Your Choices Regarding Cookies</h3>
            <p>If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.</p>
            <p>If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.</p>
            <p>If You'd like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.</p>
            <ul>
            <li>
            <p>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" rel="external nofollow noopener" target="_blank">https://support.google.com/accounts/answer/32050</a></p>
            </li>
            <li>
            <p>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" rel="external nofollow noopener" target="_blank">http://support.microsoft.com/kb/278835</a></p>
            </li>
            <li>
            <p>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" rel="external nofollow noopener" target="_blank">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></p>
            </li>
            <li>
            <p>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" rel="external nofollow noopener" target="_blank">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></p>
            </li>
            </ul>
            <p>For any other web browser, please visit your web browser's official web pages.</p>
            <h3>More Information about Cookies</h3>
            <p>You can learn more about cookies here: <a href="https://www.termsfeed.com/blog/cookies/" target="_blank">All About Cookies by TermsFeed</a>.</p>
            <h3>Contact Us</h3>
            <p>If you have any questions about this Cookies Policy, You can contact us:</p>
            <ul>
            <li>By email: contact@endorseanidea.com</li>
            </ul>`,
            date: new Date(),
            type: "Cookies Policy"
          });
        }
      })

    });
  }

  insertInitialValuesUsers() {
    User.sync().then(() => {
      User.findAll().then(async value => {
        if (!value || value.length == 0) {
          var c = await Company.create({
            name: 'Endorse',
            businessLocation: 'San Francisco, California',
            businessWebsite: "www.endorseanidea.com",
            businessSize: '0-10',
            cityId: 125809,
            industryId: 466
          });

          await User.create({
            role: 'user',
            username: "endorseanidea",
            email: "contact@endorseanidea.com",
            password: "YjVmMTQ0NjQ1YmUyYWRjODEwNjlkYWRhYTUxYzFkNmU=",
            type: "Company",
            phone: "+55 (77) 9 8135-0987",
            contractId: 1,
            companyId: c.id,
            isEmailVerified: true,
            language: 'pt-BR',
            location: 'Brazil',
            date: new Date(),
            status: 'Active',
          });
        }
      })
    });
  }

  async addCountries() {
    try {
      fs.readFile(path.join(__dirname, '../../../src/db/countries.json'), "utf8", async (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        await JSON.parse(jsonString).forEach(async (country: any) => {
          var c: any = {};
          c.id = country.id;
          c.name = country.name;
          c.iso = country.iso2;
          c.iso3 = country.iso3;
          c.numcode = country.numeric_code;
          c.phonecode = country.phone_code;
          c.capital = country.capital;
          c.currency = country.currency;
          c.currencyName = country.currency_name;
          c.currencySymbol = country.currency_symbol;
          c.region = country.region;
          c.subRegion = country.subregion;
          c.nativeName = country.native!;
          c.tld = country.tld;
          c.nationality = country.nationality;
          c.emojiU = country.emojiU;

          await Country.create(c);
          console.log(c.name)
        })

        console.log("finished countries!")
      });
    } catch (error: any) {
      console.log(error.message)
    }

  }

  async addStates() {
    try {
      fs.readFile(path.join(__dirname, '../../../src/db/states.json'), "utf8", async (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        await JSON.parse(jsonString).forEach(async (state: any) => {
          var c: any = {};
          c.id = state.id;
          c.name = state.name;
          c.stateCode = state.state_code;
          c.countryId = state.country_id;

          await State.create(c);
          console.log(c.name);
        })

        console.log("finished states!")
      });
    } catch (error: any) {
      console.log(error.message)
    }

  }

  async addCities() {
    try {
      fs.readFile(path.join(__dirname, '../../../src/db/cities.json'), "utf8", async (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        await JSON.parse(jsonString).forEach(async (city: any) => {
          var c: any = {};
          c.id = city.id;
          c.name = city.name;
          c.latitude = city.latitude;
          c.longitude = city.longitude;
          c.wikiDataId = city.wikiDataId;
          c.stateId = city.state_id;

          await City.create(c);
          console.log(c.name);
        });

        console.log("finished cities!")
      });
    } catch (error: any) {
      console.log(error.message)
    }

  }
}

export default Database;
