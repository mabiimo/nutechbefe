import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak di temukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda" });
  }
  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak di temukan" });
  res.status(200).json(user);
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.session(400).json({ msg: "tidak dapat logout" });
    res.status(200).json({ msg: "anda telah logout" });
  });
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  try {
    if (!name || !email || !password || !confPassword || !role) {
      return res.status(400).json({ msg: "Semua kolom harus diisi" });
    }

    if (password !== confPassword) {
      return res.status(400).json({ msg: "Password dan konfirmasi password tidak cocok" });
    }

    const existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(409).json({ msg: "Email sudah terdaftar" });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    return res.status(201).json({ msg: "Registrasi berhasil", uuid: newUser.uuid });
  } catch (error) {
    console.error("Error saat melakukan registrasi:", error);
    return res.status(500).json({ msg: "Terjadi kesalahan saat melakukan registrasi" });
  }
};
