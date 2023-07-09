<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Rambo9223/Medical-Center-App">
    <img src="/Medical-Center-App-frontend/src/Components/Images/2.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">Medical Center App(Capstone Project)</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/Rambo9223/Medical-Center-App"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="deployment link">View Demo</a>
    ·
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#future-changes">Future Changes</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

 The software is for managing the patient records and patient appointments for the Medical Center.  

The current system used at the centre is not efficient in many ways. There is no way for patients to view previous and upcoming appointments. There is no link between appointments and patients records databases making searching/updating records for admin staff more time consuming, this also makes reviewing patient history more time consuming for doctors.  

The new software aims to create a simple but dynamic solution to the above problems.   


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Mongo][Mongo.com]][Mongo-url]
* [![Express.js][Express.js.com]][Express.js-url]
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

The App has been secured with helmet with the default levels of protection applied.
All actions use application-json to protect against malicious attacks.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.


### Prerequisites

Ensure you have the latest copy of VSCode downloaded to your machine. 
Find it here - <a href="https://code.visualstudio.com/">VSCode</a>

### Installation

Download the zipped file from the GitHub Repo and unzip in to your chosen directory.

Open the terminal or VSCode and navigate to the directory that contains the files using cd

![terminal](/Screenshots/Terminal-Path.png)

  Type in to the terminal
    ```
    npm start
    ```
then enter, the required packages should install and once compiled you will be able to use the app on your browser at localhost:3000

![Successful Compile](/Screenshots/Successful-Compile.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

The software is for three end-users,  

1. The patients registered at the Medical Center, 

2. The doctors who work at the Medical Center,  

3. The Administration staff who work in the Medical Center

The usage of the app has some differences based on who is the end user. 

Patients - 

To log in as a patient ensure you are on the patient login path.
You can user the details - username:AFern@gmail.com , password:fern2000

![Patient-Login](/Screenshots/Login-Patient.png)

Upon logging you will see the home screen for patients 

![Patient-Home-Screen](/Screenshots/Patient-Home1.png)

The patient information is shown on the user datails card, which you are able to edit as the patient. 

![Patient-Edit-Card](/Screenshots/Patient-Edit-Details.png)

On successful edit you should see the below and the card should automatically update the edited details.

Navigate to the appointments page to see all appointments for the patient.

![Patient-Appointments](/Screenshots/Patient-Appointments.png)

These are split in to two categories, upcoming and previous.

![Upcoming](/Screenshots/Patient-Appointments-Upcoming.png)

![Previous](/Screenshots/Patient-Appointments-Previous.png)




Doctors - 

To login as a doctor ensure you navigate to the Staff Login section of the login screen
you can use the details - username:TJ@hotmail.com , password:hiTom,

![Doc-Login](/Screenshots/Doctor-Login.png)

Like the patient home page doctors details will come up on their home page, these can be edited also.

![Doc-Home](/Screenshots/Doctor-Home-Page.png)

You will now see an additional page (patients) on the nav bar, 

Navigate to the patients page. Doctors can use this page to search patient records. For example 
if they have an appointment with a patient who has been to the clinic before with a previous issue and want 
to familiarise themselves with the patients history, they can do this here. 

![Doc-Patients](/Screenshots/Doctor-Patient-Page.png)

They can query the patient database by either - patient name, unregistered or all patients. 
On search if the patient exists their record will be retireved, of which the doctor will be able to 
see in full.

![Doc-Patient-Record](/Screenshots/Doctor-Patient-Record.png)

![Doc-Patient-Record-2](/Screenshots/Doctor-Patient-Record-2.png)

In addition to this Doctors can create a new patient record. 


Navigate to the appoinments page and we can see doctors have the ability to query the appoinments 
section of the database by, date, all, patient name, doctor name etc 

![Doc-Appointments](/Screenshots/Appointment-Filter.png)

An example of a returned appointment item.

![Doc-Appointments-Card](/Screenshots/Appointment-Card-Doctor.png)

They can also edit appointments, primarily the appoinment notes of what was discussed/done with the 
patient during the appointment. 

![Doc-Appointments-Edit](/Screenshots/Edit-Appointment-Doctor.png)

![Doc-Appointments-Edit2](/Screenshots/Edit-Appointment-Doctor-2.png)

![Doc-Appointments-Edit3](/Screenshots/Edit-Apointment-Doctor-3.png)

![Doc-Appointments-Edit4](/Screenshots/Edit-Apointment-Doctor-4.png)


They have the ability to archive the appointment which onclick will add the appointment to the patient
record and remove the permission to edit the appointment record any further. 

![Doc-Appointments-Archive](/Screenshots/Archive1.png)

![Doc-Appointments-Archive](/Screenshots/Archive2.png)

![Doc-Appointments-Archive](/Screenshots/Archive3.png)

In addition to this they can also create new appointments.




Admins - 

Admins have the most usability in the app. However there are some differences. 
To login as an admin use the details - username:admin@clinic.com, password:admin1
![Admin-Login](/Screenshots/Login-Admin.png)

Like doctors admins can search for patient records although the retrieved records will ommit any confidential information from appointments.
![Admin-Patient-Card](/Screenshots/Admin-Patient-Card.png)

![Admin-Patient-Card](/Screenshots/Patient-Card-Expanded-Admin.png)

They can create new patient records like doctors. 
Admins have the unique permission to edit patient records and delete patient records.
Any changes made will automatically update on the record. 

![Admin-Patient-Record](/Screenshots/Edit-Patient-Admin.png)

In the appoinments section admins can query the database in the same way as doctors and like with patient records, 
will only be able to see the non-confidential information on the appointment card. 

![Admin-Appointment-Card](/Screenshots/Appointment-Card-Admin.png)

They can edit and delete appoinments but they cannot archive appointment as this action is reserved for doctors once the appointment has been completed. Once archived appointments can only be deleted.

![Admin-Archived](/Screenshots/Archived-Appointment-Admin.png)

The section that is exclusive to admins only is the users path. 
Navigate to the user page, like the patients page admins can query the database for the doctor & admin information of those that work at the clinic. 

![Admin-User-Page](/Screenshots/User%20Page%20Admin.png)

They can create new users, edit their information and delete users from the datatbase. 

![Admin-User1](/Screenshots/User-Card-Admin.png)

![Admin-User2](/Screenshots/User-Card-Updated-Admin.png);


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Testing -->
## Testing

To run the tests on the app simply go to the terminal and type in 
    ```
    npm test
    ```
. Provided the project has been installed correctly the backend test suite will run, and then the frontend 
test will run. It should appear as follows:
![Test1](/Screenshots/Test.png)
![Test2](/Screenshots/Test1.png)
![Test3](/Screenshots/Test2.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Future Changes -->
## Future Changes

For this project time constraints were a factor. So I have listed below some of the future changes I would like to make to the App to increase it's functionality.

- Integrate with a calendar so app is more functional as an appointment management system.

- Allow Admin & Doctors to set appointments based on what is available in the calendar.

- Add other login routes/verification for users i.e google, facebook.

- Increase responsiveness to mobile phones, currently on mobile screens app looks as follows: 

![Small-screen](/Screenshots/MobileTablet.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Scott Ramsay - sct_r_9223@live.co.uk

Project Link: [https://github.com/github_username/repo_name](https://github.com/Rambo9223/Medical-Center-App)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [The Mentors & Staff At Hyperion Dev](https://www.hyperiondev.com/)
* [Edinburgh University](https://www.ed.ac.uk/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Mongo.com]:https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]:https://www.mongodb.com/
[Express.js.com]:https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express.js-url]:https://expressjs.com/
