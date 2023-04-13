import styles from '../../styles/Project.module.css'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import TopPart from '../../Components/toppart';
import topimg from '../../public/Photos/topImages/bigImage9.jpg'
import topimgmobile from '../../public/Photos/topImages/bigImage9.jpg'
import ProjectImage from '../../Components/UI/ProjImage';
import { Router, useRouter } from 'next/router';
import { db } from "../../utils/firebase/firebase.js";
import { useState} from "react"
import Link from 'next/link';
import Head from 'next/head';



export const getServerSideProps = async (context) => {

  const projects = await db.collection("projects").limit(20).get();
  const { locale } = context

  const ProjectData = projects.docs.map((proj) => ({
    id: proj.id,
    ...proj.data(),
    params: { id: proj.id.toString() },
  }));

  console.log(ProjectData)


  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
      projects: JSON.parse(JSON.stringify(ProjectData)),

    },

  };

};



const Projects = (props) => {

  const [projects, setProjects] = useState(props.projects);
  const getImagesByTag = async () => {
    setProjects([]);
    //--------------------
    //GET THE IMAGES HERE
    //--------------------
    setProjects(projects);
  };


  const { locale } = useRouter();
  const { t } = useTranslation();
  const localisator = t(locale);
  console.log("Translation locale: ", localisator);


  return ( 
<>

<Head>
  <title>TM INOX | {t('common:2_heder')} </title>
  <meta name="description" content='Proiecte realizate de către TM INOX' />
  <meta property="og:title" content={t('common:2_heder')}  key="ogtitle" />
  <meta property="og:description" content='Proiecte realizate de către TM INOX' key="ogdesc" />
</Head>

<TopPart img={topimg} imgmobile={topimgmobile} alt='Abstract pattern stainless steel' text={t('common:2_heder')} />

<div  className={styles.projectsGrid} >
        {projects.map((proj) => {
          return (
            <Link href={"/projects/" + proj.id} key={proj.id}>        
              <div className={styles.projContiner} key={proj.id}  >
                <ProjectImage  img={proj.photo[0].downloadURL} text={localisator == 'ro' ? proj.titleRo : proj.titleEn} alt="Project main Image" />
              </div>
            </Link>
          );
        })}
        </div>
</>
   );
}
 
export default Projects;