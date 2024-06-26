import React, { ReactNode, useEffect, useState } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Heading,
} from '@chakra-ui/react'
import {
  FiMenu,
  FiGithub,
  FiAlertCircle,
  FiHome,
  FiBox,
  FiGlobe,
  FiCompass,
  FiStar,
  FiSliders,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface LinkItemProps {
  name: string
  icon: IconType
  route: string
  isBlank?: boolean
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Block', icon: FiBox, route: '/blocks' },
  { name: 'Transaction', icon: FiGlobe, route: '/txs' },
  { name: 'Validator', icon: FiCompass, route: '/validators' },
  { name: 'Proposal', icon: FiStar, route: '/proposals' },
  { name: 'Parameter', icon: FiSliders, route: '/parameters' },
]

const RefLinkItems: Array<LinkItemProps> = [
  {
    name: 'Github',
    icon: FiGithub,
    route: 'https://github.com/Catenika/namse',
    isBlank: true,
  },
  {
    name: 'Report Issues',
    icon: FiAlertCircle,
    route: 'https://github.com/Catenika/namse/issues',
    isBlank: true,
  },
]

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  // Dynamically select the appropriate logo URL based on the color mode
  const logoUrl = useColorModeValue(
    'https://raw.githubusercontent.com/Catenika/namse/main/nLogo/NAMADA%20COMBINED/SVG/Namada_COMB_RGB_Black.svg',
    'https://raw.githubusercontent.com/Catenika/namse/main/nLogo/NAMADA%20COMBINED/SVG/Namada_COMB_RGB_YELLOW.svg'
  )

  return (
    <Box
      bg={useColorModeValue('light-container', 'dark-container')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex flexDirection="column" h="full" justifyContent="space-between">
        <Box>
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <img
                src={logoUrl}
                alt="Namada Logo"
                style={{ width: '200px', height: 'auto' }}
              />
            </div>
            <CloseButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onClose}
            />
          </Flex>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} route={link.route}>
              {link.name}
            </NavItem>
          ))}
          <Heading
            mt="6"
            p="4"
            mx="4"
            size={'xs'}
            textTransform="uppercase"
            textColor={useColorModeValue('gray.500', 'gray.100')}
            fontWeight="medium"
          >
            Links
          </Heading>
          {RefLinkItems.map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              route={link.route}
              isBlank={link.isBlank}
            >
              {link.name}
            </NavItem>
          ))}
        </Box>
      </Flex>
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: string | number
  route: string
  isBlank?: boolean
}

const NavItem = ({ icon, children, route, isBlank, ...rest }: NavItemProps) => {
  const router = useRouter()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (route === '/') {
      setIsSelected(router.route === route)
    } else {
      setIsSelected(router.route.includes(route))
    }
  }, [router])

  return (
    <Link
      as={NextLink}
      href={route}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      target={isBlank ? '_blank' : '_self'}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={
          isSelected
            ? useColorModeValue('light-theme', 'dark-theme')
            : 'transparent'
        }
        color={isSelected ? 'black' : useColorModeValue('black', 'white')}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('light-container', 'dark-container')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Namada Explorer
      </Text>
    </Flex>
  )
}
