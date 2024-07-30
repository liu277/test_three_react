import { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import { getUserInfo,setUserInfo as userSet } from "../api/index";
import { formatDate } from "@/utils";
import  toast  from '@/components/toast';

export default function UserInfo() {
  const form = useRef(null);

  const [userInfo, setUserInfo] = useState<Record<string, any>>({});

  const formItem = [
    {
      label: "昵称",
      type: "input",
      name: "nickname",
      params: {
        type: "text",
      },
    },
    {
      label: "性别",
      type: "radio",
      name: "sex",
      options: [
        {
          label: "男",
          value: "male",
        },
        {
          label: "女",
          value: "female",
        },
      ],
      params: {
        type: "email",
      },
    },
    {
      label: "生日",
      type: "input",
      name: "birthday",
      params: {
        type: "date",
      },
    },
  ];

  useEffect(() => {
    getUser_info();
  }, []);

  const getUser_info = async () => {
    const { data } = await getUserInfo();
    console.log(data, "dddddddddd");

    setUserInfo(data);
  };
  const submit = async (value) => {
    console.log(value, "valuevaluevalue");
    const data = await userSet(value);
    toast({
      position: 'top-end',
      message: '修改成功'
    })
  };

  return (
    Object.keys(userInfo || {}).length > 0 && (
      <div>
        <img src={userInfo.avatar} alt="" style={{ width: 100, height: 100 }} />
        <Form
          submit={submit}
          formItem={formItem}
          defaultValue={{
            ...userInfo,
            birthday: formatDate(new Date(), "-"),
            nickname: userInfo.nickname || "",
          }}
        ></Form>
      </div>
    )
  );
}
