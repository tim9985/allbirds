// 인증 상태 관리 Context
import { createContext, useContext, useState, useEffect } from "react";
import { getMe, logoutUser } from "@/api/userAPI";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 앱 시작 시 로그인 상태 확인
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await getMe();
      // 응답 구조에 따라 유연하게 처리
      const u = userData?.user ?? userData?.data?.user ?? userData?.data ?? userData;
      setUser(u);
      setIsLoggedIn(true);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    const u = userData?.user ?? userData?.data?.user ?? userData?.data ?? userData;
    setUser(u);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("로그아웃 에러:", error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
