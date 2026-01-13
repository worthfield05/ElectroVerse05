import { Github, Instagram, ShoppingBag, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    Shop: [
      { name: "All Products", path: "/products" },
      { name: "New Arrivals", path: "/products?filter=new" },
      { name: "Best Sellers", path: "/products?filter=popular" },
      { name: "Sale", path: "/products?filter=sale" },
    ],
    Account: [
      { name: "Profile", path: "/profile" },
      { name: "Orders", path: "/orders" },
      { name: "Cart", path: "/cart" },
      { name: "Login", path: "/login" },
    ],
    Support: [
      { name: "Help Center", path: "#" },
      { name: "Shipping", path: "#" },
      { name: "Returns", path: "#" },
      { name: "Contact", path: "#" },
    ],
  };
  return (
    <footer className="bg-neutral-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              to={"/"}
              className="flex items-center gap-2 font-semibold text-lg mb-4"
            >
              {/* <ShoppingBag className="w-5 h-5" /> */}
              <div className="w-10 h-10">
                <img src="./logo.png" className=" object-cover" />
              </div>

              <span>ElectroVerse</span>
            </Link>
            <p className="text-sm text-neutral-600 mb-4">
              Premium products for modern living.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="#">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link to="#">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">
            © {currentYear} Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Privacy Policy
            </Link>
            <Link className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
