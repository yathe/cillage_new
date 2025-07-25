import { Nav, NavLink } from "../components/Nav";

export const dynamic = "force-dynamic"; 
// Force this page to always be dynamic not cached , so it always fetch fresh data

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return <>
  <Nav>
<NavLink href="/admin">Dashboard</NavLink>
<NavLink href="/admin/products">Products</NavLink>
<NavLink href="/admin/users">Customers</NavLink>
<NavLink href="/admin/orders">Sales</NavLink>
  </Nav>
  <div className="container my-6">{children}</div>
  </>
}