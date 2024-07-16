import { useState } from "react";
import DialogComponent from "../../components/dialog/DialogComponent";
import styles from "./AuthenticationPageSection.module.scss";

const AuthenticationPageSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className={styles.authentication_section}>
      <h2>Welcome to Chat application</h2>
      <DialogComponent
        isOpen={isModalOpen}
        closeDialog={() => setIsModalOpen(false)}
      >
        <h1>Dialog</h1>
      </DialogComponent>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse neque,
        porro eius exercitationem explicabo molestias eum consequuntur provident
        voluptatum. Voluptas consequatur repellendus voluptatibus error
        voluptates! Voluptas placeat, a quasi nesciunt doloribus dicta delectus
        hic consequatur, dolorem eum sequi, ipsum reiciendis aliquid natus atque
        consectetur eius harum quae eligendi. Et officiis sapiente consequatur
        reprehenderit mollitia. Qui, itaque fugiat dolores cumque modi assumenda
        sit deserunt! Rerum sit ducimus cum mollitia asperiores molestiae, animi
        ratione possimus, beatae tempore modi ipsa perferendis totam accusantium
        nesciunt. Eos, architecto minima voluptatem sint quae, obcaecati
        reprehenderit sunt quis quas, ea saepe itaque in eius. Nulla vel, fugit
        cumque ipsam aliquam illum ratione rerum facere accusantium nesciunt
        pariatur! Totam porro mollitia animi ipsa rem, alias molestias corrupti
        minima nemo vitae dolor veritatis in ut quae quas dolorum debitis?
        Ducimus itaque amet dicta obcaecati laborum, nostrum, non vel corrupti
        eum corporis quibusdam aliquam dignissimos doloribus ab quasi,
        reprehenderit asperiores. Iusto suscipit architecto quaerat animi veniam
        qui error aliquam vero consectetur hic dolorem, a impedit voluptate nisi
        aut optio sed iure reprehenderit est porro perferendis culpa quam
        ratione pariatur. Debitis maxime cumque non quae! Tempora, fuga aperiam?
        Officiis facere maxime quod omnis, provident saepe, ut adipisci
        doloremque, repudiandae minus velit temporibus. Sit perspiciatis ex
        error illum harum blanditiis voluptatum rem eius aliquam odio dolore
        inventore nemo pariatur natus, quis eum distinctio iste vero voluptas at
        nisi in esse tenetur. Suscipit ipsa nesciunt earum quisquam odit eveniet
        mollitia? Necessitatibus cupiditate, fugiat commodi natus magnam,
        aliquid, blanditiis ad possimus rem tenetur laboriosam ratione
        voluptatibus alias sit. Odit, minima aspernatur commodi sit mollitia,
        voluptatibus dolore aliquid quod quos natus repudiandae deleniti
        quisquam sint? Esse, obcaecati distinctio deleniti dolorem aliquam cum
        ipsum magnam blanditiis, harum quam ipsa sint quisquam. Veniam similique
        assumenda, voluptas dignissimos harum, veritatis quos saepe voluptatibus
        id, esse nemo libero rerum soluta omnis vitae consequatur! Molestias
        recusandae praesentium incidunt voluptatum delectus atque harum
        accusantium amet deleniti corporis magni, ad quae, veritatis suscipit
        libero repudiandae magnam necessitatibus nemo, illo facilis neque
        aspernatur commodi animi? Iusto assumenda delectus laboriosam nisi
        ducimus aliquam, totam fuga voluptates quisquam tempore unde vero facere
        placeat earum sed ipsa reiciendis vitae. Dolor id, beatae aliquam
        tempore, voluptate voluptas similique obcaecati repellat voluptates at
        rem vel facilis ipsa error sit! Autem iusto exercitationem earum
        pariatur rerum atque consectetur quisquam ducimus similique quae magnam
        error cupiditate iure, debitis deleniti quam corrupti reiciendis
        assumenda voluptatum quos totam laboriosam neque distinctio? Quibusdam
        dolores nostrum totam expedita est, neque ratione reprehenderit commodi
        iste veniam sint! Qui magnam aperiam nesciunt officia possimus
        praesentium cum omnis. Corrupti veritatis iste commodi maiores atque
        repellat illo non a pariatur unde officia, nihil, aliquam obcaecati iure
        dolore ratione recusandae facere praesentium quidem earum animi? Saepe
        atque accusamus esse? Deserunt exercitationem dolor ut laboriosam dolore
        reiciendis placeat natus asperiores libero quia mollitia velit eum at,
        assumenda quos repellat totam sit recusandae quaerat, eos repellendus.
        Obcaecati veritatis labore et architecto aspernatur, voluptatem
        exercitationem nemo incidunt tempore, rerum provident nobis consequatur
        sint commodi ea sunt ut nostrum quaerat ratione odit aliquam deleniti
        saepe repellat. Minima mollitia quibusdam sint sunt velit quo deleniti,
        voluptatem optio incidunt eos enim iste dolorem neque facilis corporis
        illum error tempora hic. Veritatis, aspernatur possimus. Corrupti iste
        exercitationem repudiandae officia esse aperiam dignissimos eos tenetur
        delectus dicta libero, eveniet nostrum laudantium error quod quisquam
        quas, blanditiis, id laboriosam consequatur incidunt modi voluptatem.
        Dicta, harum? Earum vel, incidunt aliquam temporibus itaque velit facere
        at soluta ipsum voluptas alias praesentium possimus, fuga aperiam, neque
        animi dignissimos? Laborum illo sequi culpa neque quam molestias
        similique eius placeat non atque velit iusto, esse sunt voluptas
        reprehenderit quae enim ipsum. Maxime itaque illo, non natus iste porro
        cupiditate magnam voluptas a velit! Earum, aperiam nam! Doloribus
        eligendi, earum doloremque veritatis vero debitis laboriosam amet
        suscipit officiis ex, quis vel perferendis dolor. Repellendus sint
        aliquam esse, tempora sed eligendi, quia laborum voluptates beatae
        numquam itaque? Dolor consequuntur magnam libero aliquid inventore? Id
        numquam ducimus consectetur, magni fugiat voluptas dolorem voluptatibus,
        maiores nemo quaerat deleniti eos at, debitis est corporis incidunt?
        Nihil nesciunt recusandae, repellat tempora assumenda, voluptatem
        distinctio magni eos modi nemo velit necessitatibus quas, repellendus
        cum excepturi laudantium aliquid libero adipisci quis quidem possimus.
        Consectetur minus unde sint nemo amet, nam voluptatem suscipit natus
        eius, omnis recusandae, ipsum beatae architecto repudiandae corporis
        esse quibusdam repellat dicta soluta quod atque dolorum magni? Enim
        adipisci cupiditate porro deleniti quaerat maxime debitis aliquid
        commodi exercitationem. Doloribus, unde fuga repudiandae facere saepe
        quod id nihil itaque in soluta sint magnam totam quas nulla ex animi ea
        recusandae maiores vel expedita. Error possimus nisi provident est animi
        exercitationem nobis esse, ipsam totam mollitia harum temporibus
        repellendus at expedita odit culpa adipisci dolorum rem numquam aliquid
        cum cumque similique? Ipsum ducimus sequi aliquid voluptatem in
        repudiandae odit. Eligendi expedita provident doloribus cupiditate
        quaerat delectus consequatur nam facere placeat. Libero iusto explicabo
        numquam itaque, quam at rem, quaerat eos consequatur ipsum saepe id
        cupiditate, eius dolores deleniti illum nemo inventore rerum delectus
        pariatur optio ducimus? Nulla omnis odit eligendi nobis excepturi
        mollitia officiis doloremque, culpa nesciunt dicta illo fugit eius
        dolorem amet, qui veritatis? Deserunt iste ut aperiam hic assumenda
        aliquam quaerat necessitatibus asperiores enim quam voluptas, ex cumque
        molestiae placeat, ducimus at esse temporibus voluptate. Deleniti
        officia illum deserunt commodi quod voluptates corrupti, corporis
        maiores, iure tenetur molestias consectetur vel velit, numquam enim at
        itaque? Maxime, eius deserunt? Culpa sapiente consequuntur perferendis
        totam corporis magnam et animi aspernatur asperiores. Impedit
        necessitatibus esse, voluptatibus, at natus suscipit laborum odit
        voluptate, fugiat amet velit voluptates facilis ad. Autem molestiae
        eaque dolorum enim ducimus quis omnis similique reprehenderit molestias
        saepe veniam, officiis iure hic iusto distinctio, voluptates laudantium,
        officia accusantium. Quod, cupiditate. Eligendi dicta nam ut et impedit
        voluptate officiis soluta ducimus voluptas nobis exercitationem eius
        temporibus voluptatem, perferendis suscipit. Minus odio quibusdam,
        nostrum optio corrupti atque iusto nihil eligendi libero! Velit commodi
        dignissimos illum nulla eligendi nam vero fuga minus distinctio fugiat,
        maxime suscipit quo voluptate sunt nesciunt, aperiam nostrum harum ipsam
        assumenda eveniet debitis in odit architecto. Eos, voluptatum!
      </p>
    </section>
  );
};

export default AuthenticationPageSection;
