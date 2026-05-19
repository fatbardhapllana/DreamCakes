import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, CakeSlice, ShoppingCart, PackageCheck, Settings } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.role === 'admin';

    const customerNavItems: NavItem[] = [
        {
            title: 'Ballina',
            url: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Tortat',
            url: '/cakes',
            icon: CakeSlice,
        },
        {
            title: 'Shporta',
            url: '/cart',
            icon: ShoppingCart,
        },
        {
            title: 'Porositë e Mia',
            url: '/orders',
            icon: PackageCheck,
        },
    ];

    const adminNavItems: NavItem[] = [
        {
            title: 'Ballina',
            url: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Paneli i Adminit',
            url: '/admin',
            icon: Settings,
        },
    ];

    const navItems = isAdmin ? adminNavItems : customerNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}