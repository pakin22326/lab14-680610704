import type { Registrant } from "../libs/Registrant";

export default function UserRegisterCard({
  registrant,
}: {
  registrant: Registrant;
}) {
  return (
    <div className="card mt-3">
      <div className="card-body">

        <div className="d-flex justify-content-between">
          <h5 className="mb-1">
            {registrant.fullName}
          </h5>

          <span className="fs-5">
            {registrant.total.toLocaleString()} THB
          </span>
        </div>

        <div className="text-secondary mb-2">
          {registrant.plan === "funrun"
            ? "Fun run 5.5 Km"
            : registrant.plan === "mini"
            ? "Mini Marathon 10 Km"
            : registrant.plan === "half"
            ? "Half Marathon 21 Km"
            : "Full Marathon 42.195 Km"}

          {" · "}

          {registrant.gender === "male"
            ? "👨 Male"
            : "👩 Female"}
        </div>

        <div>
          {registrant.extraItems.map((item) => (
            <span
              key={item}
              className="badge text-bg-light border me-2"
            >
              {item === "bottle"
                ? "Bottle 🍼"
                : item === "shoes"
                ? "Shoes 👟"
                : "Cap 🧢"}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}