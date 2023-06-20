import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import PageHead from '../shared/PageHead';
import Link from 'next/link';
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

export default function Home({ data }) {
  return (
    <div>
      <PageHead title="朋友们 - Hajeekn" />
      <section className="max-w-2xl mx-auto px-4" fr-fix-stroke="true">
        <div
          className="flex flex-col items-center justify-center pt-6 pb-12 border-b border-gray-100"
          fr-fix-stroke="true"
        >
          <h1 className="text-2xl font-medium">朋友们</h1>
        </div>
      </section>
      <div className="card-grid">
        {data.map((item, index) => (
          <div key={index}>
            <Card maxW="fit-content">
              <CardHeader>
                <Flex>
                  <Flex flex="4" gap="4" alignItems="center">
                    <Avatar name={item.name} src={item.avatar} />

                    <Box w="auto" h="auto">
                      <Heading size="sm">{item.name}</Heading>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{item.descr}</Text>
              </CardBody>

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  '& > button': {
                    minW: '136px',
                  },
                }}
              >
                <Link target="_blank" href={item.url}>
                  <Button
                    alignItems="center"
                    flex="1"
                    variant="ghost"
                    leftIcon={<ExternalLinkIcon />}
                  >
                    Go
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <center>
        <p className="show-method">显示方式: </p>
      </center>
      <center>
        <p>
          提交友链请查看<a href="https://github.com/hajeekn/Next.Blog">仓库 README.md</a>
        </p>
      </center>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'friends.yaml');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = yaml.parse(fileContent);

  return {
    props: {
      data,
    },
  };
}
