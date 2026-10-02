import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./OfficesCard.module.css";

// In-person offices are sublet, so they're described by landmark rather than
// street address (client request, 10/2026) — the exact address is shared with
// clients on booking. Sits under the contact form to balance the two columns.
const OFFICES = [
  {
    area: "Scarsdale, Westchester",
    landmark: "Across from the Scarsdale Metro-North station",
  },
  {
    area: "Washington Heights, NYC",
    landmark: "One block from the 181 St (A) subway station",
  },
];

const OfficesCard = () => (
  <div className={styles.card}>
    <h3 className={styles.header}>In-Person Offices</h3>
    <ul className={styles.list}>
      {OFFICES.map(({ area, landmark }) => (
        <li key={area} className={styles.office}>
          <FaMapMarkerAlt className={styles.icon} aria-hidden="true" />
          <div>
            <p className={styles.area}>{area}</p>
            <p className={styles.landmark}>{landmark}</p>
          </div>
        </li>
      ))}
    </ul>
    <p className={styles.note}>Exact location is provided to clients.</p>
  </div>
);

export default OfficesCard;
