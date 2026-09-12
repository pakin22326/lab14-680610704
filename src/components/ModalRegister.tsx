import { useState } from "react";

//STEP 1 - 1.0. : การกำหนด Type ด้วย TypeScript (type RegisterForm)
type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
};

//STEP 2 - 2.0. : ข้อมูล Array สำหรับ dropdown (plans)
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];

const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister({ onClose }: { onClose: () => void }) {
  // STEP 1 - 1.1. : การสร้าง State สำหรับเก็บข้อมูลฟอร์ม (useState)
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
  });

  // STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation
  // STEP 5 - 5.1. : การประกาศ State สำหรับคุม Checkbox และ Error (useState)
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // STEP 1 - 1.2. : ฟังก์ชันอัปเดตข้อมูลแบบไดนามิก (updateForm)
  const updateForm = (key: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const updateExtraItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation
  // STEP 5 - 5.2. : ระบบยอมรับเงื่อนไขก่อนกดปุ่ม (disabled)
  // STEP 5 - 5.3. : ฟังก์ชันตรวจสอบข้อมูลเมื่อกดปุ่ม (registerBtnOnClick)
  const registerBtnOnClick = () => {
    const newErrors = {
      fname: form.fname.trim() === "",
      lname: form.lname.trim() === "",
      plan: form.plan === "",
      gender: form.gender === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((isError) => isError);
    if (hasError) {
      return;
    }

    // STEP 4 : Total Payment
    const total = computeTotalPayment();

    const registrationData = {
      id: Date.now(),
      fullName: `${form.fname} ${form.lname}`,
      plan: form.plan,
      gender: form.gender,
      extraItems: selectedItems,
      total: total,
    };

    const oldData = JSON.parse(localStorage.getItem("registrations") || "[]");

    oldData.push(registrationData);

    localStorage.setItem("registrations", JSON.stringify(oldData));

    alert(
      `Registration complete. Please pay money for ${total.toLocaleString()} THB.`,
    );

    onClose();
  };

  // STEP 4 - 4.1. : ฟังก์ชันคำนวณราคา (computeTotalPayment)
  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;

    // ราคาสินค้าเสริม
    extraItems.forEach((item) => {
      if (selectedItems.includes(item.id)) {
        total += item.price;
      }
    });

    // เลือกสินค้าเสริมครบ 3 อย่าง ลด 20%
    if (selectedItems.length === 3) {
      total = total * 0.8;
    }

    return total;
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
              {/* STEP 6 : useState คุมการเปิด/ปิด modal เอง */}
              {/* STEP 6 - 6.2. : การสร้างและจัดการ UI Modal */}
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/* STEP 1 : First name & Last name */}
              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <label className="form-label">First name</label>
                  {/* STEP 1 - 1.3. : สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ */}
                  <input
                    value={form.fname}
                    className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                    onChange={(e) => updateForm("fname", e.target.value)}
                  />
                  {/* STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation  */}
                  {/* STEP 5 - 5.5. : การแสดงสถานะ Error บน Bootstrap Form */}
                  <div className="invalid-feedback">Invalid first name</div>
                </div>
                <div className="flex-fill">
                  <label className="form-label">Last name</label>
                  {/* STEP 1 - 1.4. : สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ */}
                  <input
                    value={form.lname}
                    className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                    onChange={(e) => updateForm("lname", e.target.value)}
                  />
                  <div className="invalid-feedback">Invalid last name</div>
                </div>
              </div>

              {/* STEP 2 : Plan dropdown — เติม .map() วน plans สร้าง <option> (ทุกตัวมี key) */}
              <div className="mt-2">
                <label className="form-label">Plan</label>
                {/* STEP 2 - 2.1 : Controlled Component & Option List */}
                <select
                  className={`form-select ${errors.plan ? "is-invalid" : ""}`}
                  value={form.plan}
                  onChange={(e) => updateForm("plan", e.target.value)}
                >
                  <option value="">Please select..</option>

                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.price.toLocaleString()} THB)
                    </option>
                  ))}
                </select>

                {/* STEP 5 - 5.6. : แสดง Invalid plan */}
                <div className="invalid-feedback">Please select a Plan</div>
              </div>

              {/* STEP 3 : Gender radio */}
              <div className="mt-2">
                <label className="form-label">Gender</label>
                <div>
                  {/* STEP 3 - 3.1 : checked & onChange */}
                  <input
                    className="me-2 form-check-input"
                    type="radio"
                    name="gender"
                    checked={form.gender === "male"}
                    onChange={() => updateForm("gender", "male")}
                  />
                  Male 👨
                  <input
                    className="mx-2 form-check-input"
                    type="radio"
                    name="gender"
                    checked={form.gender === "female"}
                    onChange={() => updateForm("gender", "female")}
                  />
                  Female 👩
                  {errors.gender && (
                    <div className="text-danger">Please select gender</div>
                  )}
                </div>
              </div>

              {/* Extra Items */}
              <div className="mt-2">
                <label className="form-label">Extra Item(s)</label>

                {extraItems.map((item) => (
                  <div key={item.id}>
                    <input
                      className="me-2 form-check-input"
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => updateExtraItem(item.id)}
                    />

                    <label className="form-check-label">
                      {item.label} ({item.price} THB)
                    </label>
                  </div>
                ))}

                {/*เมื่อเลือกสินค้าเสริมทั้งหมด */}
                {selectedItems.length === 3 && (
                  <span className="text-success d-block">(20% Discounted)</span>
                )}
              </div>

              {/* Promotion */}
              <div className="alert alert-primary mt-3" role="alert">
                Promotion📢 Buy all items to get 20% Discount
              </div>

              {/* STEP 4 : Total Payment (realtime) */}
              {/* STEP 4 - 4.2. : การแสดงผลบน UI (Real-time Rendering) */}
              <div className="mt-3">
                Total Payment : {computeTotalPayment().toLocaleString()} THB
              </div>
            </div>
            <div className="modal-footer">
              {/* STEP 5 - 5.4. : Checkbox และเปิด/ปิดปุ่ม Register */}
              {/* Terms and conditions */}
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                I agree to the terms and conditions
              </div>
              {/* Register Button */}
              <button
                type="button"
                className="btn btn-success my-2"
                onClick={registerBtnOnClick}
                disabled={!agree}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}
