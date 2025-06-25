import { Col, Image, Row } from "antd";
import { useState } from "react";
import { LeadDetailSummaryInfo } from "../utils/util";
import CustomLabelAndValueContainer from "../components/UI/Container/customLabelAndValueContainer";
import CustomInput from "../components/UI/Input/customInput";

const LeadSummaryDetails = () => {
  const [leadDetail] = useState({
    name: "Christopher Kata",
    mobile: "+567438879",
    email: "Example@gmail.com",
    home: "1234 Maple Street, Springfield, IL 62701",
    title: "Mr.",
    nationality: "Canadian",
    organization: "TechNova Ltd.",
    jobTitle: "Software Engineer",
    annualRevenue: "$500,000",
    budgetEstimate: "$50,000",
    phoneNumber: "+1-234-567-8901",
    country: "Canada",
    city: "Toronto",
    leadSource: "Website Form",
    industry: "Information Technology",
    interestLevel: "High",
  });
  const GridSize = {
    childrenGridSize: 12,
    inputGridSize: 12,
    titleGridSize: 6,
  };

  return (
    <>
      <Row>
        <Col lg={18}>
          {" "}
          <Row
            gutter={[15, 10]}
            style={{
              padding: "20px",
            }}
          >
            <CustomInput
              labelName="Name"
              name="name"
              inputType="Text"
              isEditable={true}
              errorText={"Name must have some values"}
              value={leadDetail?.name}
              //   handleOnChange={(value) => {}}
              gridSize={GridSize}
            />
            <CustomInput
              labelName="Mobile"
              name="mobile"
              inputType="Text"
              isEditable={true}
              errorText={"Name must have some values"}
              value={leadDetail?.mobile}
              //   handleOnChange={(value) => {}}
              gridSize={GridSize}
            />
            <CustomInput
              labelName="Email"
              name="email"
              inputType="Text"
              isEditable={true}
              errorText={"Name must have some values"}
              value={leadDetail?.email}
              //   handleOnChange={(value) => {}}
              gridSize={GridSize}
            />
            <CustomInput
              labelName="Home"
              name="home"
              inputType="Text"
              isEditable={true}
              errorText={"Name must have some values"}
              value={leadDetail?.home}
              //   handleOnChange={(value) => {}}
              gridSize={GridSize}
            />

            {LeadDetailSummaryInfo.map((item, index) => {
              return (
                <CustomLabelAndValueContainer
                  identifier={`${index}-${item?.title}`}
                  key={`${index}-${item?.title}-${item?.value}`}
                  title={item?.title}
                  value={
                    leadDetail[item?.keyName] ? leadDetail[item?.keyName] : "-"
                  }
                  isDetailsItem={true}
                />
              );
            })}
          </Row>
        </Col>
        <Col
          lg={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
          <Image
            width={150}
            height={150}
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFhUWFRUVFxcVFRUXFxUXFRUWFxgWFhUYHSggGBolGxUVITEiJSorLi4vFx8zODMtNygtLisBCgoKDg0OGhAQGi0lIB8tLS0tLS0tLS0tLS0tLS0tLS0vLS0tLS0tLS0vKy0tLS0tLS0tLS0tLS0tKy0tLS0tLf/AABEIAQMAwgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAABAAIEBQYDB//EAEMQAAEDAgQEAwcBBQQJBQAAAAEAAhEDIQQSMUEFUWFxBoGREyKhscHR8DIjQlJi4RQzcrIHFRZTc4KSovEkQ6PC0v/EABoBAAIDAQEAAAAAAAAAAAAAAAABAgQFBgP/xAAvEQACAQMDAgQEBwEBAAAAAAAAAQIDBBEFITESUUFxgcEiMmGREyMzUqGx8UIU/9oADAMBAAIRAxEAPwDEFBOKau0OaQkEkEDCgUkigYEEUCkMBQRXSjRc8w1pceTQT8km8ElvwcShC0mB8KPcJqVG0z/DEunkRYT0ndd3+HaLQz3nOzQJkR7xjQaGL/RUamoUIPGc+RchZVpLOMeZkigtr/qDD1IAGUxAh85uvX4H0UOp4XYf01HA7SAZjUjRecdSoPlteh6OwrLjDMsUFYY7g1alMtJaP3m3EXuYuNN1XK7CcZrMXkqyhKLxJYEhCKSkRGkJpTymlJkkNQKJQURoamlPKYQoskhJIpIGXKbCcgrZnjUE4pqRICCKSBgSAlPpUy4hrRJNgtJwjh9Ok/33h1TLP6fdp2uTOpvyVa5uoUI5lz4IsW9tOtLEeO5w4b4eacrqr7k/3Y/UeUmbT2V9TLKYyU6Ya3UxuYtM673Kl8H4S7Ej9mC1mY5qjhd+mnPT4LV4bwvRaLyee0rmLi7q1n8T27eB0dC0p0lst+55zi8Uc0F7NBIzDTkNY7b9FxqYt2YAO16gzeRPM9F63R4Phmfpo055loJPcnVSX4WmdWM/6Qq2T36UeQYXOAcoEkbgwBY5R6LrXzWJADgZsb943Gu+69Qfwmg6xpNTG8Aw21IeSMsOlHnGGxpqGHCHQIMHYTNtNP6arnxPwvTr5nUiBUN7aOO9pj09F6ZX8PYeowtyEHYt1aeY/OSyuP8ABmJpgljpuY5we9pHxXrTrVKT6oM8qlKFRdMjyXG4V9J5Y9pa4G4I+InZR1s+JF9T9jiqYa4SGVCIc08id2LJYrDOpuLXC4JHQxyO4XRWd5G4j2a5Rh3Ns6L+hxQKKBVwrATU6EEiQ2EIT0CkMaigigZboIpK0ygBBFJAxhSRKk8MwvtKjWwSJvHL8soTkoRcnwicIuTUVyy24HhWNAqPPLb9IM6A7kAnsOqtfD3B/wC21yG2oUzNV+73fu0m8hFz5c1yq4d1Ymk0Q1pDBH7xOvr8pXp3AODswtFtJmwlxOrnHVx6yuPuK0q9RzZ1VClGlBRRNwuGDWBrRAAgAbBPc1SGmAuBXi0e6eTnkKdBT4TlHpH1HHIUdE8mU1yMYHkfTqFdX15CjBOlNEXFZKLxLwKniqZBAFQD3XxoeR5gryri2DzUi14y1qJLSTEw2ZDjqRqQenVe21hZef8AjzAkAV2iRmayoOYccrHeRIaehHJelGq6U1JeB51qanBpnlBCEKfxnAewquZMizmnm11xp6eSgrrYSU4qS4ZzUouLcX4AhNKeU0psENQRKSiMakikgeS3QRKCtlACSKCMDGqy4W4sZUqjUZWiebjr5RPkq4rS4SiBhL6n39dJMD86lZup1Oig132NDTodVbPbcuPAgzOD3A/rtNpDQIPe5J/xL01tULzDwhi7tNha3mSPWy31CvIC5hHSJZLQvSCiPxAaJK4O4o2Jg/dRbJJFoU0gqld4gDdGepupOG46HbD86JD6ZInEkISkMS110BXEIwP0EyTZdMhCjOx7G6ldKePpu0ePVIUsj6hsqPGUW1GvY8S14LT2KvKtxY+ipMU7LKZHwPJvElF1MuovDTk95jt4JLS03toD/wA3pmit549wxe8PEWDhG8FrDPwKwhELo9LlmjjszCv44q57oaUCnJq0WUkNQTkCokgSkkgkMuEESEIVwoASKKBQMarypxCKDKdpe3zAbJgfCO5VInYuHlt4IYIFrm4JkrI1dflLz9mamlv8x+RoPBtWc4JsIjrr9V6pwyn+zaTuJXj3hSi72mVulh5AyTHJe00BDQOQA+C5tcnQR4IlYku+i5Nr0WkBzhJ0ABLra2F1z4lXLGuO/pfZY/iDsWKbm0Gva9wM1MvvOJmI37A2CHyey4NfxOpQF3BzZ3LHAesKnqNA96m6RtBWF4ZwXiXtpq1K+SRE5wCCQSTmtotv4d4NWLj7QQ25zAxPUt+yUuRU5Zjn+zQ8DcXalLj1U0mk77Kfw+gGyR27qNxbDNquAPL480sCb8TBtqYiuTFhO8q44bwQk+/WvyBC4V+F1Pa+yax5a3Vz/dp33AF3/JZTGeK8XSqik2myPeLh/Z25MtoAMzms6e4UlHITmo4y+T0d+Fq0jma8x1P9FzxuLzskwHAwQOXNZfBeKC6CAWiQ2rSJJDS7R7J0HTTtBm4ac2f/AAn7pJCZj/E2MDnSNWh/UGA0XHclY8q8r0XftXO7NHPM4i3L9PxVIQt7Sfkl5mFqD+NATU9NK1mZ41CE+EEsDyNSRSSwMtk1OKCuFECanlNKTGi78OD2bX4j2bXlha1geJbmMkmOYAH/AFLVjAYTitL2opexrtkGBlvpeBD2nnEqP4CoB+HcLf3z5n/hsj5FaxvCWU6TXh+TIHEydQSTv5egXHalUnK5mm9lt/B2Wn0qcbSG273+5h/DfD/ZYk0yPeByk7QDqOk/NenUrkLJ4fDsqVGYlhEGCY5QYjzHwWiw9WCPzVUsnu44yT6mFZYloJGn3UPEUJ066yp7Sk6OSYlkqxhRuJ6D+qk0aJ5R8gpM9kXVgIGpTyhvLE2nDSAq7Fe6QVYh2vVQeJUrZhsVB8jX1HPlzZ1/OSqcZgmOdNTDh8fvNY1/w1+as+GvkKaGhSzkXGxkcZwZlRwfTpFh3OTKSOohSaeALP1bgi2lwtG+yrOIYu0RCihPc8mxGGfUqCgIzOaIkhrSZIhx+pVHxLBuo1HU3xmbrlOYeRGq0lVpqYhpYCHBz3B3Jo3jvlH/AIVFx9kV3DkGf5GrZ0mo+t0/DGf6RlahSX4aqeOcf2yuQKMIQt1mOCUCUiEISGJJJJIZbJJIK4URFNKcU1JjRq/9HfFPZ1zScYbViOj2yR6iR6L0HinDn4r9kLN0PQdF4tRqljmvbZzSHDu0yPiF7rwvHte1lQSA9rSDEggjnzG4XM61bpVFUX/XPmjp9GuW6bh4x49SuwfBP7JhnUwc37SQTrEi1upPqu+DG/ZTuK1CWlsg7nsFX4Yx81j+Bp5b3ZcU32QNQKI2rZcqlVDZJRJFXFjZQcTxmjQBfWeG9SYshh2SS53kuHEuE0cS2KtMPG1yNeyju2TxFHL/AG6wzh+zcHgWltx5kJYnxRRIjMLrD8f8AVKE1cHvIdTJmQVR4PgRrjLiM7S22UaTzjdTwebaXCPYeEYtjtDrqrZrgsL4P4d7BuVpcQAbu+i1DK8iFB7Dxksaj4CyvF8T73TXsrfGYmGlZx59o6OZjy5KSE1gquFcSYaL6lNsOaHPcNS4CSL9ljfED81RpJlxpsLjzdf6Qrzw9hn061Rjj7rQ9ruRABCy2Nr+0e5+kmw5DYeQgLT0enJ1ZT7LH3/woavOMaKp93n7f6cUoSSXRnOjSmp6BCjgaGpJJIwMtUkUlcKIIQITkChjGraeBfF4w4FCt/dScrv4JuQf5SfmsWgq9xQhXg4TLFvXnQn1xPdMbxei5lnNMwAQRvYfNRmHTsvHcBUIqU9f1t36heu4Z9gDquTu7SVtPpbzk6m0uo3EeqKxgl0TYpj0aZhGuyQVSZcyEOBEbfRVvEPFeHpGA5vcmB5DUrhxrhleozLSqZRIn3ZJG+4XnvF/BuOFR72Gk5oa5wLycztIZliA65i4FrkKS42Jxjtnn6G7p+PMOTGZp3nQeRKkUvE2Fq6ZZ8p7rHDgeKyta7hTKsBs1KGKpxJadGu0MxYrNYnguKdVLWYOoy4/9ymSBfUggT0SwxKcZbdJ6/SqNN2uBHMLtTOvNYLw3wriVJwL8hZuDUkxtoInzXouBwhDcz9eSJEJfCyn4pVgG/NV3CnaGJupXHqv7vMqgxnG/wCy5LTmDpjpl+5U6dOU3iKyyM5xisyeEWfiYexpVaxphgewNBAAzvcIFuQ18l5dCuvEfiGpiyM0hjdG9eZ/OfNUy6XT7Z0aXxcvc53ULlVqnw8LYYknIK8UQIFJJAwJJIpDLNJJJXCkBAooJDAkigUhj8OYe0/zD5r1t1WKhHWR5/hXkVM3HcL1XjDS0B48+2qwNa5h6+xvaM/hn6e5b0nJ7RmVfgMaHtBCtcO9YDRt5OlMwLqo4m6Lgwfn3VpUKrsdg3OHfokng9IPDyUzuIgG9Np6hdqOIBEw0cgPumHg7wbDyg3Uyhw1wMxAUsnq6ssE7A2gnXYKdjK2Vl9VyoUcozHZVXG8XLSAdbKOMsqt75KPHVszz0WI8S4jPWjZrQ3z1Pz+C1GKq5WuMTDS6OjQSfgCsNVeXEuOpJJ7kytrSaOZufbYytUrYgodzkkigt4xAFAooJMaAgigkMSSKCALRBOQVwpDUkSgojEgUUCgaGle0VaOemRzEj0XjBC9owT5psI3a0+oCwNcW1N+fsbuiv5/T3MlUqOw7pbdpNxyV1guMBwBB/PouHGsNDiYs6T9wsrWY6m/3TAOn2Kw+TZb6T03DYgESpgcDuvMaHic0rOkKXQ8ZsOjvj+Qo9J6Rkn4noECU4OCxA8Wsi5HqPuolXxiASA4fUowSlJY5NjxPHNAJnZZDH8RzX2VTiuOuqbpYSiXkF2mw+6aR4OWdkSi0mjXef8Ac1APNpCwxXonEGxh63/Cf8ivOyt/SPkl5+xjartOPkNSRhJaxljShCJSQMaQgnFNURiQRSQMtEEUFbKQEEUksDAgigkMS9a8NVpw1En/AHbR6AD6LyVel+BaubDMH8JcP+4n6hY2tRzRjLs/Y2NGlirKPde5e47DB7S30PLosdjcLBIP4Vvgzoq7i/DhUEgQ7/N0nmubTOhaPJuOPy2eLbFZ55Z/EFufEvC/aDIZbBnqDpovPOJcMq0X5XCx/S7Z39eimmeE4tEjK3+Ieq6URfWVO4R4XL2hzz5K5o8KYwiNEZF0sHDMMYBK0uDpxsoWCpDaw/Nlb0aQGii2e0YYOXGLYat/wyPW31XnS9G483/0lY/yj/M1edLoNH/Sl5+yMTVv1Ir6e41Ap6atYyRqBTigkSGlBOTSkySAkikkBZlBOKarhTQEkUkgAgigkxgXoX+jsj2Jif7x0zpOVlh5QvPl6R4Fw2XCtd/G97vk3/6LJ1hpW/qjV0j9f0ZsmuAC4VhyMLmXoNcuWOnwVPFuHCprZw0P0WO4zg2uGR7SL6GD5g6+cr0Ss7nfusj4voBzJYCHjSL25fkpoMFVhqAYzUmBANhZRalWP6SVx4e17rGYHz7bJuKcQYIupHkyywFRXmHNllsC+DK1HCKZeQB59AoM9IkrG8PNahUptiXtgTYZtRPISAvLsVhn0nup1Glr2mHNOoK9qo0ANJso/G+B0cY3LVGV4HuVAPeb0/mb0PlC0NPv1bvpmvhf8Gff2br/ABR5R4wgVoeNeEMThj+0DchcGtqA+64nQX/Seh+KhVOAVw3MGhwGuRwcfQLo43FKXyyX3MCVCrHmLKkoJ5CbC9SA0pqcUIUSSAkkkkBZpIwgQrhSAgUUCkMSQCfRplzg1okkgAdStZwbhbKRDpDqka7N/wAI+vyXhXuI0lvz2LFC3lVe3Hcp+DeGsRiHtaGFrTdz3CA1u7oNz05r1SnhG0qbabP0saGjnbc9d1O4RhKdOkBT3u5xu5zuZP00CjY12y5S9vp3LWVhLwOmsrONunjdsiGpddM6jZJuujnwFQNFCe+26rq1EE6fP6Fd6r/yPqo7at9D6IHgh4nggcc1OGk7GIJ+iiV/DtWoIcyI0OZq01Fy6ufGqeQ6THYXw3Uaf2hAHS5K0OEDaYDWi2559SV0rPnXT80Ch1Xht3mBtPzhG7IvCLjCVgStBhqTdYHdee/6/Y21MOcdpBgGYFtTeRtcRrCiYvjdWrZzzltDW6XNrD8PkWn1hbTlzsValeK43Nvx7xFQY00xlqlwLSDdkRfNseywJAMBoiPKANonqJ6wOq4mvlF7k6BokmN7T9ed9RLo4R1T9Qyg5fc5gaSdtdvur1OkoLYpym5FTxnhft/eYAHCZcbB42kgai1z9ozOLwdSkYqMLe4sex0PkvS6dENsI8to5fFPGHBGVwBaf3S0FvmDZaFG6lBdL3RTq20ZvK2Z5QQgt/jvCVB59zNTPS7e8On6KlxPgyu27HMeO5afRwj4q5G5py8ceZVlbVI+GTMpK7/2Wxn+5/8Akpf/AKSXp+LT/cvuQ/Dn+1/Y4JFFd8HgalUxTYTzMWHc7K9JpLLM+MXJ4RGUzh3C6lY+6Ibu42aPuegV7gfDTWmapDzyH6R9XdrK6YyLACNLAAeQ0Gizq1/FbU9/qaNGwb3qbfQr8LwqnRZ7oBfB986nsNh2+KPtAW3sBtb0PXT4Ka6Lgi/5t+aKBiqX7wBHfQ2gBZc5ubzJmpGCgsRRc8I8QmicrhmYRtaI11/Oyu28Sw77+0aP8Xux6rz5+KiA9rmxuNO8xaLfJcm4ixAuDNgeZi3O8QOqqzt4TeeD3hXlFYPSi1jh7rmn/C4H5eajYqm9tN5aGlzWOcA52VpIaSMxOgnfZecHEmAYNgSb/wApJ66qu4x4jxVKmaYquyVA5jrzY2LQf3Zg6X5aqvO16VnJ7xuu6Nd4I8RuxzHiqwMqsNwy7XNMEOaZPnc6tO60rqTGXeQ3uQF4JgcViWVC+hUd7wDS0vfLgSPcBmTeDrt62eF406o5kudD3FsPLidLw5xuAY92fTRecaSk92P/ANbjHGNz1+vxjD09HZr7d4uT5+irMT4iJsxjQOpJvptac0LIurhpy1HBszYXsbm2ti1S6VUEfpc7yLRcDNB5TB0VuNvTR4yuqkvHBbV+JPcYzFs8hAE2v/zCPPuoftTM3OxzGdZADrDf3SeoXN2Ym0bTuSSBmnvb0EInDZrnMY/jMgE62C9lFLhHg5N8sdUxLLRLtZgSbzZx5iACJvE7SnhhfecjSLkSXOnae+p1sDqugaBAaLWbtHfqgXWk84iJsbdQpYEScI1ok7zcycxO+uvmuz65zaW72H37qI1wBBiCeUT2026J8zygmxHxtb580ASxWNiGx1InbaLjkntxkHaNdbH1Chm29+ZjKP8AmJ3+yGeLmTaNuXT8v1QMsxiDvfcR9Sk7E73gi0yAN/RVtCrNtL7XM+Wp6LtTri4dttMHrp16HRAHYvO3+YJKD/a+Rd8UExHTC8KwzB+kOPNxzadIyqfVrhsNaAJ8hHl+aKuw+IdsLehPT0hQsTiHEmPlfpbcfdSnOUt5PJGEIx2isF6Kwby57kfbmEnPttJH513+CquHvLriD5RcdfI/FSnPgEg9yI10t+bqJML3NnQm3Mzp2g8032hItPST+SuTanPSdttY80HnWxmbCBJGkbRomLI+oJB93aOn3vCh1MG137uUkzIIA1jbbT0UlrteW8/nzTHaACIPIDr5efUJAVlfg+pD3gDk7uLg7Kr4nwV1RuT2gOh/Tpc3kHqtLUqc4t0Ea6W89FGDdRc6ze0FJxT5A8wqMyOdScfeDsttJGjpPlHrK0PCeCUKkF8F8McS15aCDabaOltxzvupvGPCxrEPY5uYWdNj0BnUhTuCcHNAHOSTpIEtEEmAYkiXOO36iq8KWJbrYbZNw+Bps/RTEi069jJ179lNpMNwRffv1jvqo7XE39Nr6fnmnOruFgD5wB8D2VgR3eGi0yTrsDG8nlCfnkZRf0/rsuAixI2m0wfPby6J1MaEZtLzBiOZ+iYHdlKLCb9QI0kdrpreQ/VyEgJlN1p2nUzFtRH5qi6oDeDIt/4FvwIEdm77HufQz3THkxLgbchYyB8fuiys4CIt5WvuOcJU6l72O8nTe4F5+iAHOYScxtzuL7d+WsqPVAt758wDc8j9VJyRHwIEiZj0mVwfU6zMajpeBHZAxzaxAkHlNiRy8h9kwwbgRuZAO/e2/wAF2ovAEk+8dI00m/JRgTe4G9hI7n5+aAJGd3L/AC/dJRTVB/f/AO0/ZFIDowH2cxJvvbTr1VU3NprB3APxKtXu/ZiQd7318vP4KtGsH3fiO19E2Bb4Npa0X2k8h5a7Bdqhjcmdcsz2TKPoAPyFyfEnn1AFtAdfyEwHNMAwDe86d7R5o+10MydSYAg9/NAkxsLCeQjkmVLWy2F72+/P4IAbVcP3YnmI6a3n4BcjEXubXMQLcrE6FPqGBzJvq2R6oZMp0JMDyuPRIQacnU+Ym3S5umubNhz3Bn6IVC0iJd03+miLoIGUTG3K2lz2QAS4i1rRvbXknZs0XJ8gB3t9FwaSDF43FyZvf5p9F1947kiO2yAOr6UCGxYzrfT56rjTt+7B5idrSYNyk5pBIi55ARHnebpwtuBPIj0Pw5aJDC0TrAEDQkDY+ZvHmn1RAjWIvm0vy8kx490NLvgJAk6W5/Nc2sAMl1juTHlOv/hMR1ZOnoRmnrcC8yEQ1rtQZEQQBzOsd04NaLEyOY+F05zQLTpF5aYg3jqUhgF4OU5ecz3Ibzsurhlmw01m8Qdj81wbWInQWtcnqb8vRAusHE3/AJS7fppcpiHVAMwjMNdJuRztawXGpSvpYDlrE/HT1XcmwINh0EidOspuUcxbvc6RPf5oA5U3WMSLWtqOt9fujVMAmW2663HP8hPaWiBmvrfnpp6rnjWhuWBcxadNOQ7+iAIpaPw/1SXX2DuR9EkATuIUx7Nvn8yqrh9MGrBFpaY7gSgkkM0TqYG2g8r9FDbTF7DQfJJJMBzWguAOkDpqeiY0w4d2jrFt/qkkgGMdcuPLN9R9AuIMtP8AiA8rWSSQgYmaev1Qe4gW5x8Y17JJJiOWFvmnaIv0KmYdg9mXbw0/IJJKIzm5gyk7wDvqYldTTAawgXOvWx2SSQBwixPX5T9k8j38uxBMdgSikmAHaT0+nLzSrvILoOg+h+wRSQIYHe6dLHkNgme0Ok6Zo9fikkgBzHe73gfNDD1nOBkzb6FBJNiH0hDXH+Zo8jKXEGAZYtYadSUklFjQBgqfL/ud90kklEZ//9k="
          />
        </Col>
      </Row>
    </>
  );
};
export default LeadSummaryDetails;
