export default function Footer() {
  return (
    <footer className="py-6 text-center bg-gray-800">
      <p className="text-gray-400">
        © {new Date().getFullYear()} John Doe. All rights reserved.
      </p>
    </footer>
  );
}
