"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type Profile = {
  first_name: string | null
  last_name: string | null
}

export default function NavbarAccount() {

  const supabase = createClientComponentClient()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {

    const loadUser = async () => {

      const { data } = await supabase.auth.getUser()

      const currentUser = data?.user

      if (!currentUser) {
        setLoading(false)
        return
      }

      setUser(currentUser)

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", currentUser.id)
        .single()

      if (!error && profileData) {
        setProfile(profileData)
      }

      setLoading(false)
    }

    loadUser()

  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading...
      </div>
    )
  }

  // USER NOT LOGGED IN
  if (!user) {
    return (
      <div className="flex items-center gap-4 text-sm">

        <Link
          href="/login"
          className="hover:text-blue-600 transition"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="hover:text-blue-600 transition"
        >
          Register
        </Link>

      </div>
    )
  }

  // USER LOGGED IN
  const fullName = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()

  return (
    <div className="flex items-center gap-4 text-sm">

      <span className="font-medium">
        Hello {fullName || user.email}
      </span>

      <Link
        href="/account"
        className="hover:text-blue-600 transition"
      >
        Account
      </Link>

      <button
        onClick={handleLogout}
        className="hover:text-red-600 transition"
      >
        Logout
      </button>

    </div>
  )
}