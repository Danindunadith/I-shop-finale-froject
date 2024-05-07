import React from "react";
import styles from "./Progress.module.css";

function Progress() {
  return (
    <div className={styles.container}>
      <h3 className={styles.intro}>
        Whether you've brought your device into our shop or utilized our
        convenient delivery service, we've got you covered every step of the
        way.
      </h3>
      <h2 className={styles.title}>
        Here's how you can track the progress of your repair:
      </h2>
      <main className={styles.main}>
        <section id="repair-form" className={styles.section}>
          <h2>Submit Your Repair</h2>
          <div className={styles.image}>
            <img
              src="../src/pages/repair/Customer/Progress/repair_form_image.jpg"
              alt="Repair Form Image"
              className={styles.image}
            />
          </div>
          <div className={styles.text}>
            <p>
              Fill out the repair form with details about your device, including
              type (mobile phone, tablet, laptop, smartwatch, accessory, or
              other), model (e.g., Samsung Galaxy S7 Edge), and a description of
              the issue.
            </p>
            <p>
              Upon submission, you'll receive a unique repair ID that you can
              use to track your repair progress. If you send the package via the
              delivery service, you should stick the Repair ID on the package.
            </p>
          </div>
        </section>
        <section id="pending-repairs" className={styles.section}>
          <h2>Pending Repairs</h2>
          <div className={styles.imageContainer}>
            <img
              src="../src/pages/repair/Customer/Progress/pending_repairs_image.jpg"
              alt="Pending Repairs Table Image"
              className={styles.image}
            />
            <p>
              If you can't remember your repair ID, don't worry. Your order will
              appear in the pending repairs table.
            </p>
            <p>
              Technicians haven't started working on these orders yet, but your
              device is queued up and ready to go.
            </p>
          </div>
        </section>
        <section id="ongoing-repairs" className={styles.section}>
          <h2>Ongoing Repairs</h2>
          <div className={styles.imageContainer}>
            <img
              src="../src/pages/repair/Customer/Progress/ongoing_repairs_image.jpg"
              alt="Ongoing Repairs Table Image"
              className={styles.image}
            />
            <p>
              Once our technicians begin working on your device, you can track
              its progress in the ongoing repairs table.
            </p>
            <p>
              We'll provide an estimated completion date so you can plan
              accordingly.
            </p>
          </div>
        </section>
        <section id="completed-repairs" className={styles.section}>
          <h2>Completed Repairs</h2>
          <div className={styles.imageContainer}>
            <img
              src="../src/pages/repair/Customer/Progress/completed_repairs_image.jpg"
              alt="Completed Repairs Table Image"
              className={styles.image}
            />
            <p>
              Your device is ready for pickup! Visit our shop to check your
              repaired item and take it home.
            </p>
            <p>
              We recommend inspecting your device to ensure everything meets
              your satisfaction before leaving.
            </p>
          </div>
        </section>
        <section id="unrepairable-items" className={styles.section}>
          <h2>Unrepairable Items</h2>
          <div className={styles.imageContainer}>
            <img
              src="../src/pages/repair/Customer/Progress/unrepairable_items_image.jpg"
              alt="Unrepairable Items Table Image"
              className={styles.image}
            />
            <p>
              In some cases, repairs may not be possible. If your item falls
              into this category, it will appear in the unrepairable items
              table.
            </p>
            <p>
              You can come to our shop to collect your item, and we'll discuss
              any available options with you.
            </p>
          </div>
        </section>
      </main>
      <p className={styles.footer}>
        Thank you for choosing us for your repair needs. We strive to provide
        transparent and efficient service every step of the way. If you have any
        questions or concerns, feel free to reach out to our team.
      </p>
    </div>
  );
}

export default Progress;
